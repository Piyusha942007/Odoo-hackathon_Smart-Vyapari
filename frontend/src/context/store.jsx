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