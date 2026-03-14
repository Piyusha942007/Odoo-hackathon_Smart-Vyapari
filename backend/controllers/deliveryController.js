import pool from '../config/db.js';

export const getDeliveries = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT 
                d.order_id as id, 
                d.customer_name as customer, 
                d.status, 
                d.created_at as date,
                COALESCE(
                    json_agg(
                        json_build_object('name', p.name, 'qty', di.quantity)
                    ) FILTER (WHERE di.product_id IS NOT NULL), '[]'
                ) as products,
                COALESCE(SUM(di.quantity), 0) as "totalQty"
            FROM delivery_orders d
            LEFT JOIN delivery_items di ON d.order_id = di.order_id
            LEFT JOIN products p ON di.product_id = p.product_id
            GROUP BY d.order_id
            ORDER BY d.created_at DESC
        `);
        res.status(200).json({ success: true, deliveries: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};

export const createDelivery = async (req, res) => {
    // items is an array of { product_id, quantity }
    const { source_hub_id, customer_name, total_amount, items, remarks } = req.body;
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Create the delivery order
        const orderResult = await client.query(
            "INSERT INTO delivery_orders (customer_name, status, total_amount) VALUES ($1, $2, $3) RETURNING order_id",
            [customer_name, 'Done', total_amount || 0]
        );
        const orderId = orderResult.rows[0].order_id;

        for (const item of items) {
            // 2. Validate inventory exists and is sufficient
            const invCheck = await client.query(
                "SELECT quantity FROM inventory WHERE product_id = $1 AND hub_id = $2",
                [item.product_id, source_hub_id]
            );

            if (invCheck.rows.length === 0 || invCheck.rows[0].quantity < item.quantity) {
                throw new Error(`Insufficient inventory for product ID ${item.product_id} in hub ${source_hub_id}`);
            }

            // 3. Deduct inventory
            await client.query(
                "UPDATE inventory SET quantity = quantity - $1, last_updated = CURRENT_TIMESTAMP WHERE product_id = $2 AND hub_id = $3",
                [item.quantity, item.product_id, source_hub_id]
            );

            // 4. Record the delivery item
            await client.query(
                "INSERT INTO delivery_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
                [orderId, item.product_id, item.quantity]
            );

            // 5. Log into stock_ledger
            await client.query(
                "INSERT INTO stock_ledger (product_id, hub_id, type, quantity_change, reference_no, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
                [item.product_id, source_hub_id, 'delivery', -item.quantity, `DELV-${orderId}`, remarks || 'Outgoing Delivery']
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, message: "Delivery processed successfully.", order_id: orderId });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};
