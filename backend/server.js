import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import transferRoutes from './routes/transferRoutes.js';
import adjustmentRoutes from './routes/adjustmentRoutes.js';
import ledgerRoutes from './routes/ledgerRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);

// Operations Routes
app.use('/api/operations/receipts', receiptRoutes);
app.use('/api/operations/deliveries', deliveryRoutes);
app.use('/api/operations/transfers', transferRoutes);
app.use('/api/operations/adjustments', adjustmentRoutes);

// Ledger
app.use('/api/ledger', ledgerRoutes);

app.get('/', (req, res) => {
    res.send('Odoo Smart Vyapari API is running with the new schema');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
