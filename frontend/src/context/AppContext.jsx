import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [products] = useState([
        { id: '1', name: 'Laptop HP ProBook 450', stock: 50 },
        { id: '2', name: 'Office Chair Ergonomic', stock: 25 },
        { id: '3', name: 'Printer Ink Cartridge', stock: 100 },
        { id: '4', name: 'Wireless Mouse', stock: 60 },
    ]);

    const [receipts, setReceipts] = useState([
        {
            id: 'REC001',
            supplier: 'Tech Supplies Inc.',
            products: [{ productId: '1', productName: 'Laptop HP ProBook 450', quantity: 20 }],
            status: 'Done',
            date: '2026-03-10'
        }
    ]);

    const [deliveryOrders, setDeliveryOrders] = useState([
        {
            id: 'DO001',
            customer: 'ABC Corporation',
            products: [
                { productId: '1', productName: 'Laptop HP ProBook 450', quantity: 5 },
                { productId: '4', productName: 'Wireless Mouse', quantity: 10 }
            ],
            status: 'Ready',
            date: '2026-03-11'
        }
    ]);

    const [stockLedger, setStockLedger] = useState([
        { id: 1, date: '2026-03-11', type: 'delivery', productName: 'Laptop HP ProBook 450', warehouse: 'Main Warehouse', quantityChange: -5, reference: 'DO001' },
        { id: 2, date: '2026-03-10', type: 'receipt', productName: 'Laptop HP ProBook 450', warehouse: 'Main Warehouse', quantityChange: 20, reference: 'REC001' },
        { id: 3, date: '2026-03-09', type: 'transfer', productName: 'Wireless Mouse', warehouse: 'Main Warehouse', quantityChange: -15, reference: 'IT001' },
    ]);

    const addReceipt = (receipt) => setReceipts([...receipts, receipt]);
    const addDeliveryOrder = (order) => setDeliveryOrders([...deliveryOrders, order]);

    return (
        <AppContext.Provider value={{
            products,
            receipts,
            addReceipt,
            deliveryOrders,
            addDeliveryOrder,
            stockLedger
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);