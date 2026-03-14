import fs from 'fs';
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

const runSchema = async () => {
    try {
        const sql = fs.readFileSync(path.join(process.cwd(), 'schema.sql'), 'utf-8');
        await pool.query(sql);
        console.log("Schema successfully executed!");
        process.exit(0);
    } catch (err) {
        console.error("Error executing schema:", err);
        process.exit(1);
    }
};

runSchema();
