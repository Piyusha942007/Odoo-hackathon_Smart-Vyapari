import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// 1. Import your Context Provider from store.jsx
import { AppProvider } from './context/store';

// 2. Import your Components
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import WarehouseSettings from './pages/WarehouseSettings';

const Layout = ({ userRole }) => {
    return (
        <div className="flex min-h-screen bg-[#F4F7FE]">
            {/* Sidebar Navigation */}
            <Sidebar userRole={userRole} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden flex flex-col h-screen">
                <div className="flex-1 overflow-y-auto w-full">
                    <Routes>
                        {/* Ensure these paths match your Sidebar links exactly */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/settings" element={<WarehouseSettings />} />

                        {/* Redirect empty path to dashboard */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />

                        {/* Fallback for broken links */}
                        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

function App() {
    // Mock role: Set to 'manager' to see everything
    const userRole = 'manager';

    return (
        <AppProvider>
            <Router>
                <Layout userRole={userRole} />
            </Router>
        </AppProvider>
    );
}

export default App;