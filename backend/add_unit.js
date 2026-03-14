const pool = require('./db');

async function addUnitColumn() {
    try {
        await pool.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS unit VARCHAR(20) DEFAULT 'pcs';
        `);
        console.log("✅ Added 'unit' column to products table.");
        process.exit(0);
    } catch(err) {
        console.error("❌ Failed to alter table:", err);
        process.exit(1);
    }
}

addUnitColumn();
