const pool = require('./db');

const sql = `
-- 1. CLEANUP
DROP TABLE IF EXISTS delivery_items, delivery_orders, stock_ledger, inventory, products, storage_hubs CASCADE;

-- 2. CREATE TABLES
CREATE TABLE IF NOT EXISTS storage_hubs (
    hub_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    manager_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    material VARCHAR(100),
    dimensions_json JSONB,
    base_price DECIMAL(12, 2) NOT NULL,
    reorder_level INTEGER DEFAULT 10,
    assembly_required BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    hub_id INTEGER REFERENCES storage_hubs(hub_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    bin_location VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, hub_id)
);

CREATE TABLE IF NOT EXISTS stock_ledger (
    ledger_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    hub_id INTEGER REFERENCES storage_hubs(hub_id),
    type VARCHAR(20) CHECK (type IN ('receipt', 'delivery', 'transfer', 'adjustment')),
    quantity_change INTEGER NOT NULL,
    reference_no VARCHAR(100),
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT
);

CREATE TABLE IF NOT EXISTS delivery_orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Waiting' CHECK (status IN ('Waiting', 'Done', 'Cancelled')),
    total_amount DECIMAL(12, 2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES delivery_orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

-- 3. INSERT PRODUCTS (10 total)
INSERT INTO products (sku, name, category, material, dimensions_json, base_price, reorder_level) VALUES
('FUR-OAK-DESK-01', 'Executive Oak Desk', 'Office', 'Solid Oak', '{"w": 160, "d": 80, "h": 75, "u": "cm"}', 850.00, 10),
('FUR-LIV-SOF-02', 'Velvet Cloud 3-Seater Sofa', 'Living Room', 'Velvet/Pine', '{"w": 220, "d": 95, "h": 85, "u": "cm"}', 1200.00, 5),
('FUR-LIV-TAB-05', 'Marble Top Coffee Table', 'Living Room', 'Marble/Brass', '{"w": 90, "d": 90, "h": 45, "u": "cm"}', 450.00, 8),
('FUR-LIV-CHR-09', 'Leather Wingback Armchair', 'Living Room', 'Top-grain Leather', '{"w": 85, "d": 90, "h": 110, "u": "cm"}', 750.00, 4),
('FUR-BED-FRM-12', 'King Size Walnut Bed Frame', 'Bedroom', 'Walnut Wood', '{"w": 200, "d": 215, "h": 120, "u": "cm"}', 1550.00, 3),
('FUR-BED-NST-03', 'Minimalist Oak Nightstand', 'Bedroom', 'Light Oak', '{"w": 45, "d": 40, "h": 55, "u": "cm"}', 180.00, 15),
('FUR-BED-DRW-07', '6-Drawer Scandinavian Dresser', 'Bedroom', 'MDF/Ash Wood', '{"w": 140, "d": 45, "h": 80, "u": "cm"}', 620.00, 6),
('FUR-DIN-TAB-21', 'Industrial Reclaimed Wood Dining Table', 'Dining', 'Teak/Iron', '{"w": 200, "d": 100, "h": 76, "u": "cm"}', 980.00, 4),
('FUR-OFF-CHR-44', 'Ergonomic Mesh Office Chair', 'Office', 'Nylon/Mesh', '{"w": 65, "d": 65, "h": 125, "u": "cm"}', 350.00, 20),
('FUR-OFF-BKS-11', 'Floating Wall Bookshelf', 'Office', 'Engineered Wood', '{"w": 120, "d": 25, "h": 30, "u": "cm"}', 120.00, 25);

-- 4. INSERT DEFAULT HUBS
INSERT INTO storage_hubs (name, address, manager_name) VALUES 
('Main Distribution Center', '123 Logistics Park, Zone A', 'John Doe'),
('East Coast Hub', '45 Industrial Pkwy, Building 2', 'Sarah Smith');
`;

async function seed() {
    try {
        await pool.query(sql);
        console.log("✅ Seeded DB successfully!");
        process.exit(0);
    } catch(err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();
