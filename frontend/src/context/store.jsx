import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Ensure these initial states are arrays, NOT null
    const [products, setProducts] = useState([]);
    const [receipts, setReceipts] = useState([]);

    return (
        <AppContext.Provider value={{ products, receipts }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);