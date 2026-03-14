import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "Pranay",
    role: "Inventory Manager",
    email: "manager@smartvyapari.com",
    avatarColor: "#5DADE2"
  });

  const [inventoryAdjustments] = useState([
    { ref: "ADJ/001", product: "Office Chair", location: "Warehouse A", quantity: "-2.00", date: "2026-03-14" }
  ]);
  const [internalTransfers] = useState([
    { id: "WH/INT/001", source: "Main Warehouse", destination: "Retail Shop", product: "Printer Ink", qty: 50, status: "Ready", date: "2026-03-14" },
    { id: "WH/INT/002", source: "Main Warehouse", destination: "Repair Center", product: "Office Chair", qty: 2, status: "Draft", date: "2026-03-15" }
  ]);

  return (
    <AppContext.Provider value={{ user, setUser, inventoryAdjustments }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};