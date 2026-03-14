import pool from '../config/db.js';

export const createAdjustment = async (req, res) => {
    // items is an array of { product_id, quantity_change }
    // quantity_change can be positive (add) or negative (shrinkage/damage)
    const { hub_id, items, remarks } = req.body;
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const refNo = `ADJ-${Date.now()}`;

        for (const item of items) {
            // Get current inventory
            const invCheck = await client.query(
                "SELECT quantity FROM inventory WHERE product_id = $1 AND hub_id = $2",
                [item.product_id, hub_id]
            );

            let currentQty = 0;
            if (invCheck.rows.length > 0) {
                currentQty = invCheck.rows[0].quantity;
            }

            // Negative adjustment logic check (prevent going below 0)
            if (item.quantity_change < 0 && currentQty + item.quantity_change < 0) {
                throw new Error(`Adjustment brings inventory below 0 for product ID ${item.product_id}`);
            }

            if (invCheck.rows.length === 0) {
                if (item.quantity_change < 0) throw new Error("Cannot negatively adjust non-existent inventory.");
                await client.query(
                    "INSERT INTO inventory (product_id, hub_id, quantity) VALUES ($1, $2, $3)",
                    [item.product_id, hub_id, item.quantity_change]
                );
            } else {
                await client.query(
                    "UPDATE inventory SET quantity = quantity + $1, last_updated = CURRENT_TIMESTAMP WHERE product_id = $2 AND hub_id = $3",
                    [item.quantity_change, item.product_id, hub_id]
                );
            }

            // Log into stock_ledger
            await client.query(
                "INSERT INTO stock_ledger (product_id, hub_id, type, quantity_change, reference_no, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
                [item.product_id, hub_id, 'adjustment', item.quantity_change, refNo, remarks || 'Inventory Adjustment']
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, message: "Adjustment processed successfully." });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};
