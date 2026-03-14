import pool from '../config/db.js';

export const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Products in Stock (Distinct SKUs vs Total Physical Quantity)
        const totalStockRes = await pool.query("SELECT COALESCE(SUM(quantity), 0) as total FROM inventory");
        const totalPhysicalStock = totalStockRes.rows[0].total;

        // Total unique products
        const totalProductsRes = await pool.query("SELECT COUNT(*) as count FROM products");
        const totalProducts = totalProductsRes.rows[0].count;

        // 2. Low Stock Items (Total per product < reorder_level)
        const lowStockRes = await pool.query(`
            SELECT COUNT(*) as count FROM (
                SELECT p.product_id 
                FROM products p
                LEFT JOIN inventory i ON p.product_id = i.product_id
                GROUP BY p.product_id, p.reorder_level
                HAVING COALESCE(SUM(i.quantity), 0) <= p.reorder_level
            ) as low_stock_items;
        `);
        const lowStockCount = lowStockRes.rows[0].count;

        // 3. Pending Receipts & Deliveries
        // Only delivery_orders have states in the new schema
        const pendingDelRes = await pool.query("SELECT COUNT(*) as count FROM delivery_orders WHERE status = 'Waiting'");
        const pendingDeliveries = pendingDelRes.rows[0].count;
        
        // Receipts directly hit inventory, so no "pending status" array. Default to 0.
        const pendingReceipts = 0;

        res.json({
            success: true,
            stats: {
                totalProducts,
                totalPhysicalStock,
                lowStockCount,
                pendingDeliveries,
                pendingReceipts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
