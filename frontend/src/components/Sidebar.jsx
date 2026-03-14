import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Truck,
    FileInput,
    ArrowRightLeft,
    ClipboardList,
    Settings
} from "lucide-react";

import "../styles/dashboard.css";

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">

            <div className="sidebar-logo">
                Smart Vyapari
            </div>

            <div className="sidebar-menu">

                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/dashboard' || location.pathname === '/' ? 'sidebar-active' : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </div>
                </Link>

                <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/products' ? 'sidebar-active' : ''}`}>
                        <Package size={18} /> Products
                    </div>
                </Link>

                <Link to="/receipts" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/receipts' ? 'sidebar-active' : ''}`}>
                        <FileInput size={18} /> Receipts
                    </div>
                </Link>

                <Link to="/deliveries" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/deliveries' ? 'sidebar-active' : ''}`}>
                        <Truck size={18} /> Delivery Orders
                    </div>
                </Link>

                <Link to="/transfers" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/transfers' ? 'sidebar-active' : ''}`}>
                        <ArrowRightLeft size={18} /> Internal Transfers
                    </div>
                </Link>

                <Link to="/ledger" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/ledger' ? 'sidebar-active' : ''}`}>
                        <ClipboardList size={18} /> Stock Ledger
                    </div>
                </Link>

                <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={`sidebar-item ${location.pathname === '/settings' ? 'sidebar-active' : ''}`}>
                        <Settings size={18} /> Warehouse Settings
                    </div>
                </Link>

            </div>

        </div>
    );
}