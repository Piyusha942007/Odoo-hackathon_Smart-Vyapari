import pool from '../config/db.js';

export const getLedger = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                sl.id, 
                p.name as product_name, 
                w.name as warehouse_name, 
                sl.change_amount, 
                sl.timestamp,
                io.doc_type 
            FROM stock_ledger sl
            JOIN products p ON sl.product_id = p.id
            LEFT JOIN warehouses w ON sl.warehouse_id = w.id
            LEFT JOIN inventory_operations io ON sl.operation_id = io.id
            ORDER BY sl.timestamp DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
