import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const pool = new Pool({
    user: process.env.DB_USER || process.env.PG_USER || 'postgres',
    host: process.env.DB_HOST || process.env.PG_HOST || 'localhost',
    database: process.env.DB_NAME || process.env.PG_DATABASE || 'auth_demo',
    password: process.env.DB_PASSWORD || process.env.PG_PASSWORD || 'piyusha.100',
    port: process.env.DB_PORT || process.env.PG_PORT || 5433,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

export default pool;
