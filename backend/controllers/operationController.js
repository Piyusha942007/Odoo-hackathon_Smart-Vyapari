import pool from '../config/db.js';

export const createOperation = async (req, res) => {
    const { doc_type, source_location_id, destination_location_id, items } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // 1. Create the Operation Document
        const opRes = await client.query(
            `INSERT INTO inventory_operations 
            (doc_type, status, source_location_id, destination_location_id, created_by) 
            VALUES ($1, 'done', $2, $3, $4) RETURNING id`,
            [doc_type, source_location_id, destination_location_id, 1] // HARDCODED user ID 1 for now
        );
        const opId = opRes.rows[0].id;

        // 2. Insert items and update Ledger
        for (let item of items) {
            await client.query(
                'INSERT INTO operation_items (operation_id, product_id, quantity_requested, quantity_done) VALUES ($1, $2, $3, $4)',
                [opId, item.product_id, item.quantity, item.quantity]
            );

            // Origin deduction (if applicable)
            if (source_location_id) {
                await client.query(
                    'INSERT INTO stock_ledger (product_id, warehouse_id, change_amount, operation_id) VALUES ($1, $2, $3, $4)',
                    [item.product_id, source_location_id, -item.quantity, opId]
                );
            }
            // Destination addition (if applicable)
            if (destination_location_id) {
                await client.query(
                    'INSERT INTO stock_ledger (product_id, warehouse_id, change_amount, operation_id) VALUES ($1, $2, $3, $4)',
                    [item.product_id, destination_location_id, item.quantity, opId]
                );
            }
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, operation_id: opId });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
};

export const getOperations = async (req, res) => {
    const { type } = req.query;
    try {
        let query = 'SELECT * FROM inventory_operations';
        let params = [];
        if (type) {
            query += ' WHERE doc_type = $1';
            params.push(type);
        }
        query += ' ORDER BY created_at DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
