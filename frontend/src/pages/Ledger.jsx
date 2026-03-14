import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import { Search, Filter, ArrowUpRight, ArrowDownRight, ArrowRightLeft, FileEdit } from 'lucide-react';

const StockLedger = () => {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/ledger');
                const data = await response.json();
                
                const formatted = data.map(dbLedger => ({
                    id: dbLedger.ledger_id,
                    date: new Date(dbLedger.movement_date).toLocaleDateString(),
                    type: dbLedger.type,
                    reference: dbLedger.reference_no || `REF-${dbLedger.ledger_id}`,
                    productName: dbLedger.product_name || dbLedger.sku || "Unknown Product",
                    quantityChange: dbLedger.quantity_change,
                    user: 'System' // Mocking User
                }));

                setLedger(formatted);
            } catch (error) {
                console.error("Failed to fetch ledger:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLedger();
    }, []);

    const getTypeDetails = (type) => {
        switch (type) {
            case 'receipt':
                return { label: 'Receipt', color: '#059669', bg: '#D1FAE5', icon: <ArrowUpRight size={14} color="#059669" /> };
            case 'delivery':
                return { label: 'Delivery', color: '#DC2626', bg: '#FEE2E2', icon: <ArrowDownRight size={14} color="#DC2626" /> };
            case 'transfer':
                return { label: 'Transfer', color: '#2563EB', bg: '#DBEAFE', icon: <ArrowRightLeft size={14} color="#2563EB" /> };
            case 'adjustment':
                return { label: 'Adjustment', color: '#D97706', bg: '#FEF3C7', icon: <FileEdit size={14} color="#D97706" /> };
            default:
                return { label: type, color: '#4B5563', bg: '#F3F4F6', icon: null };
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="main">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Stock Ledger</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Complete history of all inventory movements</p>
                    </div>
                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', gap: '16px', padding: '20px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff', alignItems: 'center' }}>
                        <div style={{ flex: '1', position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search by reference or product..."
                                style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', color: '#374151', boxSizing: 'border-box', backgroundColor: '#F9FAFB' }}
                            />
                        </div>
                        <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontSize: '13px', fontWeight: '500' }}>
                            <Filter size={16} color="#6B7280" /> Filter
                        </button>
                    </div>

                    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Date</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Type</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Reference</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Product</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Quantity</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>Loading ledger...</td>
                                </tr>
                            ) : ledger.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>No movements found in database.</td>
                                </tr>
                            ) : ledger.map((entry, index) => {
                                const typeDetails = getTypeDetails(entry.type);
                                return (
                                    <tr key={entry.id} style={{ borderBottom: index === ledger.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {entry.date}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ 
                                                backgroundColor: typeDetails.bg, 
                                                color: typeDetails.color, 
                                                padding: '4px 12px', 
                                                borderRadius: '6px', 
                                                fontSize: '12px', 
                                                fontWeight: '600',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}>
                                                {typeDetails.icon}
                                                {typeDetails.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {entry.reference}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#4B5563' }}>
                                            {entry.productName}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700' }}>
                                            <span style={{ 
                                                color: entry.quantityChange > 0 ? '#059669' : (entry.quantityChange < 0 ? '#DC2626' : '#6B7280'),
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                {entry.quantityChange > 0 ? '+' : ''}{entry.quantityChange}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {entry.user}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockLedger;
