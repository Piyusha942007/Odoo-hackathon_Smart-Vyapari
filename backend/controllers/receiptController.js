import pool from '../config/db.js';

export const getReceipts = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT 
                sl.reference_no as id,
                'Supplier (Unknown)' as supplier,
                p.name as "productName",
                sl.quantity_change as "productQty",
                sl.quantity_change as "totalQty",
                sl.movement_date as date,
                'Done' as status
            FROM stock_ledger sl
            JOIN products p ON sl.product_id = p.product_id
            WHERE sl.type = 'receipt'
            ORDER BY sl.movement_date DESC
        `);
        res.status(200).json({ success: true, receipts: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};

export const createReceipt = async (req, res) => {
    const { destination_hub_id, items, remarks } = req.body;
    // items is an array of { product_id, quantity }
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const item of items) {
            // Check if inventory exists for this product in the hub
            const invCheck = await client.query(
                "SELECT * FROM inventory WHERE product_id = $1 AND hub_id = $2",
                [item.product_id, destination_hub_id]
            );

            if (invCheck.rows.length === 0) {
                // Insert new inventory record
                await client.query(
                    "INSERT INTO inventory (product_id, hub_id, quantity) VALUES ($1, $2, $3)",
                    [item.product_id, destination_hub_id, item.quantity]
                );
            } else {
                // Update existing inventory
                await client.query(
                    "UPDATE inventory SET quantity = quantity + $1, last_updated = CURRENT_TIMESTAMP WHERE product_id = $2 AND hub_id = $3",
                    [item.quantity, item.product_id, destination_hub_id]
                );
            }

            // Log into stock_ledger
            await client.query(
                "INSERT INTO stock_ledger (product_id, hub_id, type, quantity_change, reference_no, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
                [item.product_id, destination_hub_id, 'receipt', item.quantity, `RECT-${Date.now()}`, remarks || 'Incoming Receipt']
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, message: "Receipt processed successfully." });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};
