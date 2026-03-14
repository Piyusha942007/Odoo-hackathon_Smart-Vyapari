require('dotenv').config(); // 1. Load your .env variables first
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Ensure this matches your database file name

const app = express(); // 2. Initialize "app" - THIS FIXES THE ERROR

// Middleware
app.use(cors());
app.use(express.json());

// 3. Test Route (To check if backend is alive)
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: "Backend is working!", time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Products Route (Fetching your furniture products)
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY product_id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
app.post('/api/products', async (req, res) => {
    try {
        const { sku, name, category, unit, base_price } = req.body;
        
        const insertQuery = `
            INSERT INTO products (sku, name, category, unit, base_price)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        
        const result = await pool.query(insertQuery, [sku, name, category, unit, base_price]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update specific product
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, unit, reorder_level } = req.body;
        
        const updateQuery = `
            UPDATE products 
            SET name = $1, category = $2, unit = $3, reorder_level = $4
            WHERE product_id = $5 
            RETURNING *;
        `;
        
        const result = await pool.query(updateQuery, [name, category, unit, reorder_level, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete specific product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Begin transaction to delete child records first
        await pool.query('BEGIN');
        await pool.query('DELETE FROM inventory WHERE product_id = $1', [id]);
        await pool.query('DELETE FROM stock_ledger WHERE product_id = $1', [id]);
        await pool.query('DELETE FROM delivery_items WHERE product_id = $1', [id]);
        await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
        await pool.query('COMMIT');

        res.json({ message: "Product and associated records deleted successfully" });
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});

// Storage Hubs Route (for Dashboard)
app.get('/api/hubs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM storage_hubs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Deliveries Route
app.get('/api/deliveries', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM delivery_orders ORDER BY order_date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Receipts Route
app.get('/api/receipts', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT sl.*, p.name as product_name
            FROM stock_ledger sl
            LEFT JOIN products p ON p.product_id = sl.product_id
            WHERE type = 'receipt' 
            ORDER BY movement_date DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Ledger Route
app.get('/api/ledger', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT sl.*, p.name as product_name, p.sku
            FROM stock_ledger sl
            LEFT JOIN products p ON p.product_id = sl.product_id
            ORDER BY movement_date DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Connected to DB: ${process.env.DB_NAME}`);
});