import React, { createContext, useContext, useState, useEffect } from 'react';

// Custom hook to use local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const WarehouseContext = createContext();

export const useWarehouse = () => {
  return useContext(WarehouseContext);
};

export const WarehouseProvider = ({ children }) => {
  // Initial Data
  const initialProducts = [
    { id: '1', name: 'Widget Pro 500', sku: 'SKU-001-2024', category: 'Electronics', price: 29.99, stock: 150, minStock: 20, supplier: 'Tech Components Co.' },
    { id: '2', name: 'Connector XL', sku: 'SKU-023-2024', category: 'Hardware', price: 5.50, stock: 500, minStock: 100, supplier: 'Global Parts Ltd.' },
    { id: '3', name: 'Assembly Kit', sku: 'SKU-045-2024', category: 'Tools', price: 89.99, stock: 8, minStock: 25, supplier: 'ABC Suppliers Inc.' },
    { id: '4', name: 'Mounting Bracket', sku: 'SKU-078-2024', category: 'Hardware', price: 15.75, stock: 285, minStock: 30, supplier: 'Global Parts Ltd.' },
  ];

  const initialReceipts = [
    { id: 'RCP-2024-0156', supplier: 'ABC Suppliers Inc.', date: '2024-03-15', items: 12, totalQty: 350, status: 'Ready' },
    { id: 'RCP-2024-0157', supplier: 'XYZ Distribution', date: '2024-03-15', items: 8, totalQty: 220, status: 'Waiting' },
    { id: 'RCP-2024-0158', supplier: 'Global Parts Ltd.', date: '2024-03-16', items: 15, totalQty: 480, status: 'Draft' },
    { id: 'RCP-2024-0155', supplier: 'Tech Components Co.', date: '2024-03-14', items: 5, totalQty: 85, status: 'Done' },
  ];

  const initialDeliveries = [
    { id: "DEL-2024-0289", customer: "Retail Store Alpha", dueDate: "2024-03-15", items: 12, totalQty: 350, status: "Ready" },
    { id: "DEL-2024-0290", customer: "Distribution Center B", dueDate: "2024-03-15", items: 8, totalQty: 220, status: "Waiting" },
    { id: "DEL-2024-0291", customer: "Wholesale Partner", dueDate: "2024-03-16", items: 15, totalQty: 480, status: "Draft" },
    { id: "DEL-2024-0288", customer: "Online Order #5423", dueDate: "2024-03-14", items: 5, totalQty: 85, status: "Done" },
  ];
  
  const initialTransfers = [
    { id: "TRF-2024-0421", product: "Widget Pro 500", sku: "SKU-001-2024", quantity: 50, from: "Rack A-12", to: "Rack B-15", scheduled: "2024-03-15", status: "Ready" },
    { id: "TRF-2024-0422", product: "Connector XL", sku: "SKU-023-2024", quantity: 100, from: "Rack B-05", to: "Warehouse 2 - Rack A-01", scheduled: "2024-03-15", status: "Waiting" },
    { id: "TRF-2024-0423", product: "Assembly Kit", sku: "SKU-045-2024", quantity: 75, from: "Rack C-08", to: "Rack C-20", scheduled: "2024-03-16", status: "Draft" },
    { id: "TRF-2024-0420", product: "Mounting Bracket", sku: "SKU-078-2024", quantity: 200, from: "Rack D-15", to: "Rack A-05", scheduled: "2024-03-14", status: "Done" }
  ];

  const initialAdjustments = [
    { id: "ADJ-2024-0087", product: "Widget Pro 500", sku: "SKU-001-2024", location: "Rack A-12", recorded: 100, physical: 95, difference: -5, reason: "Physical count discrepancy", adjustedBy: "John Doe", date: "2024-03-14" },
    { id: "ADJ-2024-0088", product: "Connector XL", sku: "SKU-023-2024", location: "Rack B-05", recorded: 150, physical: 155, difference: 5, reason: "Inventory recount", adjustedBy: "Jane Smith", date: "2024-03-15" },
    { id: "ADJ-2024-0089", product: "Assembly Kit", sku: "SKU-045-2024", location: "Rack C-08", recorded: 200, physical: 185, difference: -15, reason: "Damaged goods removed", adjustedBy: "Mike Johnson", date: "2024-03-15" }
  ];

  const initialHistory = [
    { id: "MV-2024-0985", reference: "RCP-2024-0155", type: "Receipt", product: "Widget Pro 500", sku: "SKU-001-2024", from: "Supplier", to: "Rack A-12", quantity: 50, timestamp: "2024-03-15 14:30", user: "John Doe" },
    { id: "MV-2024-0984", reference: "DEL-2024-0288", type: "Delivery", product: "Connector XL", sku: "SKU-023-2024", from: "Rack B-05", to: "Customer", quantity: -25, timestamp: "2024-03-15 11:15", user: "Jane Smith" },
    { id: "MV-2024-0983", reference: "TRF-2024-0420", type: "Internal", product: "Mounting Bracket", sku: "SKU-078-2024", from: "Rack D-15", to: "Rack A-20", quantity: 100, timestamp: "2024-03-14 16:45", user: "Mike Johnson" },
    { id: "MV-2024-0982", reference: "ADJ-2024-0087", type: "Adjustment", product: "Assembly Kit", sku: "SKU-045-2024", from: "Virtual (Loss)", to: "Rack C-08", quantity: -5, timestamp: "2024-03-14 09:20", user: "System" }
  ];

  const initialLedger = [
    { date: "2024-03-15", reference: "RCP-2024-0155", product: "Widget Pro 500", sku: "SKU-001-2024", location: "Rack A-12", before: 100, change: 50, after: 150, type: "Receipt", details: "Supplier ABC" },
    { date: "2024-03-15", reference: "DEL-2024-0288", product: "Connector XL", sku: "SKU-023-2024", location: "Rack B-05", before: 525, change: -25, after: 500, type: "Delivery", details: "Order #5423" },
    { date: "2024-03-14", reference: "ADJ-2024-0087", product: "Assembly Kit", sku: "SKU-045-2024", location: "Rack C-08", before: 13, change: -5, after: 8, type: "Adjustment", details: "Damaged Count" }
  ];

  // State
  const [products, setProducts] = useLocalStorage('warehouse_products', initialProducts);
  const [receipts, setReceipts] = useLocalStorage('warehouse_receipts', initialReceipts);
  const [deliveries, setDeliveries] = useLocalStorage('warehouse_deliveries', initialDeliveries);
  const [transfers, setTransfers] = useLocalStorage('warehouse_transfers', initialTransfers);
  const [adjustments, setAdjustments] = useLocalStorage('warehouse_adjustments', initialAdjustments);
  const [history, setHistory] = useLocalStorage('warehouse_history', initialHistory);
  const [ledger, setLedger] = useLocalStorage('warehouse_ledger', initialLedger);

  // Actions
  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }]);
  };

  const addReceipt = (receipt) => {
    const id = `RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipts([{ ...receipt, id, status: 'Draft' }, ...receipts]);
  };

  const validateReceipt = (id) => {
    setReceipts(receipts.map(r => r.id === id ? { ...r, status: 'Done' } : r));
    // Ideally this would also add to history, ledger, and update product stock, but simplified for mock.
  };

  const addDelivery = (delivery) => {
    const id = `DEL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setDeliveries([{ ...delivery, id, status: 'Draft' }, ...deliveries]);
  };

  const validateDelivery = (id) => {
    setDeliveries(deliveries.map(d => d.id === id ? { ...d, status: 'Done' } : d));
  };

  const addTransfer = (transfer) => {
    const id = `TRF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTransfers([{ ...transfer, id, status: 'Draft' }, ...transfers]);
  };

  const executeTransfer = (id) => {
    setTransfers(transfers.map(t => t.id === id ? { ...t, status: 'Done' } : t));
  };

  const addAdjustment = (adjustment) => {
    const id = `ADJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAdjustments([{ ...adjustment, id }, ...adjustments]);
  };

  const value = {
    products, setProducts, addProduct,
    receipts, setReceipts, addReceipt, validateReceipt,
    deliveries, setDeliveries, addDelivery, validateDelivery,
    transfers, setTransfers, addTransfer, executeTransfer,
    adjustments, setAdjustments, addAdjustment,
    history, setHistory,
    ledger, setLedger,
  };

  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
};
