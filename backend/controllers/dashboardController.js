export const getDashboardStats = async (req, res) => {
    try {
        const stats = await pool.query(`
            SELECT 
                (SELECT SUM(change_amount) FROM stock_ledger) as total_stock,
                (SELECT COUNT(*) FROM products p 
                 WHERE (SELECT SUM(change_amount) FROM stock_ledger WHERE product_id = p.id) < p.low_stock_threshold
                ) as low_stock_count,
                (SELECT COUNT(*) FROM inventory_operations WHERE doc_type = 'receipt' AND status = 'waiting') as pending_receipts,
                (SELECT COUNT(*) FROM inventory_operations WHERE doc_type = 'delivery' AND status = 'waiting') as pending_deliveries
        `);
        res.json(stats.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};