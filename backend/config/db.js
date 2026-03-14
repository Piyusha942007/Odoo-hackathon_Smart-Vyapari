import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || process.env.PG_USER,
    host: process.env.DB_HOST || process.env.PG_HOST,
    database: process.env.DB_NAME || process.env.PG_DATABASE,
    password: process.env.DB_PASSWORD || process.env.PG_PASSWORD,
    port: process.env.DB_PORT || process.env.PG_PORT || 5432,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

export default pool;