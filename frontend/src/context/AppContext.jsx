import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user] = useState({
    name: "Inventory Manager",
    role: "Manager",
    email: "manager@smartvyapari.com"
  });

  // Basic lists so the other pages don't crash
  const [inventoryAdjustments] = useState([]);
  const [internalTransfers] = useState([]);
  const [products] = useState([]);

  return (
    <AppContext.Provider value={{ user, inventoryAdjustments, internalTransfers, products }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);