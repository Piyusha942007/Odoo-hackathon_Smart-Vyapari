import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const Receipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/receipts');
                const data = await response.json();
                
                const formatted = data.map(dbReceipt => ({
                    id: dbReceipt.reference_no || `REC-${dbReceipt.ledger_id}`,
                    supplier: "System Default Supplier", // Mocking supplier since it's not in the new SL table yet
                    productName: dbReceipt.product_name || "Unknown Product",
                    productQty: dbReceipt.quantity_change,
                    totalQty: dbReceipt.quantity_change,
                    date: new Date(dbReceipt.movement_date).toISOString().split('T')[0],
                    status: 'Done' // Default since SL implies completed
                }));

                setReceipts(formatted);
            } catch (error) {
                console.error("Failed to fetch receipts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Done': return { bg: '#22C55E', color: 'white' };
            case 'Waiting': return { bg: '#F97316', color: 'white' };
            case 'Ready': return { bg: '#3B82F6', color: 'white' };
            default: return { bg: '#6B7280', color: 'white' };
        }
    };

    return (
        <div>
            <Sidebar />

            <div className="main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Receipts</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage incoming stock receipts</p>
                    </div>
                    
                    <button className="primary-btn" style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', lineHeight: '1' }}>+</span> New Receipt
                    </button>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Receipt ID</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Supplier</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Products</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Total Quantity</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Date</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>Loading receipts...</td>
                                </tr>
                            ) : receipts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>No receipts found in database.</td>
                                </tr>
                            ) : receipts.map((receipt, index) => {
                                const statusStyle = getStatusStyle(receipt.status);
                                return (
                                    <tr key={receipt.id} style={{ borderBottom: index === receipts.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {receipt.id}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#3B82F6' }}>
                                            {receipt.supplier}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {receipt.productName} <span style={{ color: '#1F3A93', fontWeight: '600' }}>({receipt.productQty})</span>
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {receipt.totalQty}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {receipt.date}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            <span style={{ 
                                                backgroundColor: statusStyle.bg, 
                                                color: statusStyle.color, 
                                                padding: '4px 12px', 
                                                borderRadius: '4px', 
                                                fontSize: '11px', 
                                                fontWeight: 'bold' 
                                            }}>
                                                {receipt.status}
                                            </span>
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

export default Receipts;
