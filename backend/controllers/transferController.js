import pool from '../config/db.js';

export const createTransfer = async (req, res) => {
    const { source_hub_id, destination_hub_id, items, remarks } = req.body;
    
    if (source_hub_id === destination_hub_id) {
        return res.status(400).json({ success: false, message: "Source and destination cannot be the same." });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const refNo = `TRF-${Date.now()}`;

        for (const item of items) {
            // 1. Validate source inventory exists and is sufficient
            const sourceInv = await client.query(
                "SELECT quantity FROM inventory WHERE product_id = $1 AND hub_id = $2",
                [item.product_id, source_hub_id]
            );

            if (sourceInv.rows.length === 0 || sourceInv.rows[0].quantity < item.quantity) {
                throw new Error(`Insufficient inventory for product ID ${item.product_id} in source hub`);
            }

            // 2. Deduct from source
            await client.query(
                "UPDATE inventory SET quantity = quantity - $1, last_updated = CURRENT_TIMESTAMP WHERE product_id = $2 AND hub_id = $3",
                [item.quantity, item.product_id, source_hub_id]
            );

            // 3. Add to destination
            const destInv = await client.query(
                "SELECT * FROM inventory WHERE product_id = $1 AND hub_id = $2",
                [item.product_id, destination_hub_id]
            );

            if (destInv.rows.length === 0) {
                await client.query(
                    "INSERT INTO inventory (product_id, hub_id, quantity) VALUES ($1, $2, $3)",
                    [item.product_id, destination_hub_id, item.quantity]
                );
            } else {
                await client.query(
                    "UPDATE inventory SET quantity = quantity + $1, last_updated = CURRENT_TIMESTAMP WHERE product_id = $2 AND hub_id = $3",
                    [item.quantity, item.product_id, destination_hub_id]
                );
            }

            // 4. Log two ledger entries
            await client.query(
                "INSERT INTO stock_ledger (product_id, hub_id, type, quantity_change, reference_no, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
                [item.product_id, source_hub_id, 'transfer', -item.quantity, refNo, remarks || 'Outgoing Transfer']
            );

            await client.query(
                "INSERT INTO stock_ledger (product_id, hub_id, type, quantity_change, reference_no, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
                [item.product_id, destination_hub_id, 'transfer', item.quantity, refNo, remarks || 'Incoming Transfer']
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, message: "Transfer processed successfully." });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ success: false, message: error.message });
    } finally {
        client.release();
    }
};
