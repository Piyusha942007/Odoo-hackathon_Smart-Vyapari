import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import productRoutes from './routes/productRoutes.js';
import operationRoutes from './routes/operationRoutes.js';
import ledgerRoutes from './routes/ledgerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/ledger', ledgerRoutes);

app.get('/', (req, res) => {
    res.send('Odoo Smart Vyapari API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
