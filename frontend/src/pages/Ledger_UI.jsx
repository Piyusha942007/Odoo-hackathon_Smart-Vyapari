import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getLedger } from '../services/api';
import '../styles/dashboard.css';

const StockLedger = () => {
    const [ledger, setLedger] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLedger();
    }, []);

    const fetchLedger = async () => {
        try {
            const res = await getLedger();
            if (res.data.success) {
                setLedger(res.data.ledger);
            }
        } catch (error) {
            console.error("Failed to fetch ledger", error);
        } finally {
            setLoading(false);
        }
    };

    const getTypeStyle = (type) => {
        switch (type) {
            case 'delivery': return { bg: '#3B82F6', color: 'white' };
            case 'receipt': return { bg: '#22C55E', color: 'white' };
            case 'transfer': return { bg: '#A855F7', color: 'white' };
            case 'adjustment': return { bg: '#F97316', color: 'white' };
            default: return { bg: '#6B7280', color: 'white' };
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0].substring(0, 5);
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
                            <option value="delivery">Delivery</option>
                            <option value="receipt">Receipt</option>
                            <option value="transfer">Transfer</option>
                            <option value="adjustment">Adjustment</option>
                        </select>
                    </div>

                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>Loading ledger history...</div>
                    ) : (
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
                                    const isPositive = entry.quantity_change > 0;
                                    return (
                                        <tr key={index} style={{ borderBottom: index === ledger.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                            <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                                {formatDate(entry.movement_date)}
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <span style={{
                                                    backgroundColor: typeStyle.bg,
                                                    color: typeStyle.color,
                                                    padding: '4px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {entry.type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                                {entry.product_name}
                                                <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 'normal', marginTop: '2px' }}>{entry.sku}</div>
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
                                                    {entry.hub_name}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: 'bold' }}>
                                                {isPositive ? (
                                                    <span style={{ color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ fontSize: '15px' }}>Γåù</span> +{entry.quantity_change}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ fontSize: '15px' }}>Γåÿ</span> {entry.quantity_change}
                                                    </span>
                                                )}
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                                {entry.reference_no}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    );
};

export default StockLedger;
