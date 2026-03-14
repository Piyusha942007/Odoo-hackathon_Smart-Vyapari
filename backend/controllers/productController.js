import pool from '../config/db.js';

// Get all products with their total inventory count across all hubs
export const getProducts = async (req, res) => {
    try {
        const query = `
            SELECT p.*, COALESCE(SUM(i.quantity), 0) as total_stock
            FROM products p
            LEFT JOIN inventory i ON p.product_id = i.product_id
            GROUP BY p.product_id
            ORDER BY p.name ASC;
        `;
        const result = await pool.query(query);
        res.json({ success: true, products: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const { sku, name, category, material, dimensions_json, base_price, reorder_level } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO products (sku, name, category, material, dimensions_json, base_price, reorder_level) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [sku, name, category, material, dimensions_json || '{}', base_price, reorder_level || 10]
        );
        res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get inventory details for a specific product
export const getProductInventory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT i.*, h.name as hub_name 
             FROM inventory i
             JOIN storage_hubs h ON i.hub_id = h.hub_id
             WHERE i.product_id = $1`,
            [id]
        );
        res.json({ success: true, inventory: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
