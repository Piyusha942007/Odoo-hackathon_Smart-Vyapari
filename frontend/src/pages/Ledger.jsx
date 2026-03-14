import React from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const StockLedger = () => {

    // Mock Data matching the image
    const ledger = [
        {
            date: '2026-03-11',
            type: 'Delivery',
            product: 'Laptop HP ProBook 450',
            warehouse: 'Main Warehouse',
            qtyObj: { change: -5, isPositive: false },
            reference: 'DO001'
        },
        {
            date: '2026-03-10',
            type: 'Receipt',
            product: 'Laptop HP ProBook 450',
            warehouse: 'Main Warehouse',
            qtyObj: { change: 20, isPositive: true },
            reference: 'REC001'
        },
        {
            date: '2026-03-09',
            type: 'Transfer',
            product: 'Wireless Mouse',
            warehouse: 'Main Warehouse',
            qtyObj: { change: -15, isPositive: false },
            reference: 'IT001'
        },
        {
            date: '2026-03-08',
            type: 'Adjustment',
            product: 'Printer Ink Cartridge',
            warehouse: 'Main Warehouse',
            qtyObj: { change: -2, isPositive: false },
            reference: 'ADJ001'
        }
    ];

    const getTypeStyle = (type) => {
        switch (type) {
            case 'Delivery': return { bg: '#3B82F6', color: 'white' };
            case 'Receipt': return { bg: '#22C55E', color: 'white' };
            case 'Transfer': return { bg: '#A855F7', color: 'white' };
            case 'Adjustment': return { bg: '#F97316', color: 'white' };
            default: return { bg: '#6B7280', color: 'white' };
        }
    };

    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Stock Ledger</h1>
                    <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Complete history of all stock movements</p>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    
                    <div className="card" style={{ flex: '1', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Search size={18} color="#9CA3AF" />
                        <input 
                            type="text" 
                            placeholder="Search by product or reference ID..." 
                            style={{ 
                                border: 'none', 
                                outline: 'none', 
                                width: '100%', 
                                fontSize: '13px', 
                                color: '#374151' 
                            }} 
                        />
                    </div>
                    
                    <div className="card" style={{ width: '250px', padding: '12px 16px' }}>
                        <select 
                            style={{ 
                                width: '100%', 
                                border: 'none', 
                                outline: 'none', 
                                fontSize: '13px', 
                                color: '#1F3A93', 
                                fontWeight: '600',
                                backgroundColor: 'transparent',
                                appearance: 'auto'
                            }}
                        >
                            <option>All Types</option>
                            <option>Delivery</option>
                            <option>Receipt</option>
                            <option>Transfer</option>
                            <option>Adjustment</option>
                        </select>
                    </div>

                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Date</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Type</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Product</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Warehouse</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Quantity Change</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Reference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ledger.map((entry, index) => {
                                const typeStyle = getTypeStyle(entry.type);
                                return (
                                    <tr key={index} style={{ borderBottom: index === ledger.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {entry.date}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ 
                                                backgroundColor: typeStyle.bg, 
                                                color: typeStyle.color, 
                                                padding: '4px 12px', 
                                                borderRadius: '6px', 
                                                fontSize: '11px', 
                                                fontWeight: 'bold' 
                                            }}>
                                                {entry.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {entry.product}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ 
                                                border: '1px solid #93C5FD', 
                                                color: '#3B82F6', 
                                                padding: '4px 10px', 
                                                borderRadius: '6px', 
                                                fontSize: '11px', 
                                                fontWeight: '600',
                                                backgroundColor: 'transparent'
                                            }}>
                                                {entry.warehouse}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 'bold' }}>
                                            {entry.qtyObj.isPositive ? (
                                                <span style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '15px' }}>↗</span> +{entry.qtyObj.change}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '15px' }}>↘</span> {entry.qtyObj.change}
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {entry.reference}
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