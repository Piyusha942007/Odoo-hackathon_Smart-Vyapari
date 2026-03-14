-- 1. Wipe old versions to fix the column mismatch
DROP TABLE IF EXISTS stock_ledger CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS delivery_items CASCADE;
DROP TABLE IF EXISTS delivery_orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS storage_hubs CASCADE;

-- 2. Create Locations Table
CREATE TABLE storage_hubs (
    hub_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    manager_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Products Table (Now with product_id)
CREATE TABLE products (
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

-- 4. Create Inventory Levels
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id) ON DELETE CASCADE,
    hub_id INTEGER REFERENCES storage_hubs(hub_id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
    bin_location VARCHAR(50),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, hub_id)
);

-- 5. Create Stock Ledger
CREATE TABLE stock_ledger (
    ledger_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    hub_id INTEGER REFERENCES storage_hubs(hub_id),
    type VARCHAR(20) CHECK (type IN ('receipt', 'delivery', 'transfer', 'adjustment')),
    quantity_change INTEGER NOT NULL,
    reference_no VARCHAR(100),
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT
);

-- 6. Create Delivery Orders
CREATE TABLE delivery_orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'Waiting' CHECK (status IN ('Waiting', 'Done', 'Cancelled')),
    total_amount DECIMAL(12, 2),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Create Order Items
CREATE TABLE delivery_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES delivery_orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

-- 8. Seed Initial Data
INSERT INTO storage_hubs (name, manager_name) VALUES ('Main Warehouse', 'Admin');

INSERT INTO products (sku, name, category, material, dimensions_json, base_price, reorder_level) VALUES
('FUR-LIV-SOF-02', 'Velvet Cloud 3-Seater Sofa', 'Living Room', 'Velvet/Pine', '{"w": 220, "d": 95, "h": 85, "u": "cm"}', 1200.00, 5),
('FUR-LIV-TAB-05', 'Marble Top Coffee Table', 'Living Room', 'Marble/Brass', '{"w": 90, "d": 90, "h": 45, "u": "cm"}', 450.00, 8),
('FUR-OFF-CHR-44', 'Ergonomic Mesh Office Chair', 'Office', 'Nylon/Mesh', '{"w": 65, "d": 65, "h": 125, "u": "cm"}', 350.00, 20);
