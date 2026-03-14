import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Ensure these are initialized as empty arrays []
  const [products] = useState([
    { id: '1', name: 'Laptop HP ProBook 450' },
    { id: '2', name: 'Wireless Mouse' }
  ]);
  const [receipts, setReceipts] = useState([]);
  const [deliveryOrders] = useState([]);
  const [stockLedger] = useState([]);

  const addReceipt = (newReceipt) => setReceipts((prev) => [...prev, newReceipt]);

  return (
    <AppContext.Provider value={{
      products: products || [],
      receipts: receipts || [],
      addReceipt,
      deliveryOrders: deliveryOrders || [],
      stockLedger: stockLedger || []
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) return {}; // Safety fallback
  return context;
};