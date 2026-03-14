import pool from '../config/db.js';

export const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, c.name as category_name,
                   COALESCE((SELECT SUM(change_amount) FROM stock_ledger WHERE product_id = p.id), 0) as current_stock
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, sku, category_id, uom, low_stock_threshold } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, sku, category_id, uom, low_stock_threshold) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, sku, category_id, uom, low_stock_threshold || 10]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
