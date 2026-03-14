import pool from '../config/db.js';

export const getLedger = async (req, res) => {
    try {
        const query = `
            SELECT 
                l.ledger_id, l.type, l.quantity_change, l.reference_no, l.movement_date, l.remarks,
                p.name as product_name, p.sku,
                h.name as hub_name
            FROM stock_ledger l
            JOIN products p ON l.product_id = p.product_id
            JOIN storage_hubs h ON l.hub_id = h.hub_id
            ORDER BY l.movement_date DESC;
        `;
        const result = await pool.query(query);
        res.json({ success: true, ledger: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
