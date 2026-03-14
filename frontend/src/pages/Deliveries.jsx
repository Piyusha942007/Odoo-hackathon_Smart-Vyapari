import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const DeliveryOrders = () => {

    // Mock Data matching the image
    const orders = [
        {
            id: 'DO001',
            customer: 'ABC Corporation',
            products: [
                { name: 'Laptop HP ProBook 450', qty: 5 },
                { name: 'Wireless Mouse', qty: 10 }
            ],
            totalQty: 15,
            date: '2026-03-11',
            status: 'Ready'
        },
        {
            id: 'DO002',
            customer: 'XYZ Limited',
            products: [
                { name: 'Office Chair Ergonomic', qty: 8 }
            ],
            totalQty: 8,
            date: '2026-03-13',
            status: 'Waiting'
        }
    ];

    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Delivery Orders</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage outgoing deliveries</p>
                    </div>
                    
                    <button className="primary-btn" style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', lineHeight: '1' }}>+</span> New Delivery Order
                    </button>
                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Order ID</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Customer</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Products</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Total Quantity</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Date</th>
                                <th style={{ color: '#1F3A93', fontSize: '13px', fontWeight: 'bold', padding: '16px 24px', textAlign: 'left' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} style={{ borderBottom: index === orders.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                    <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                        {order.id}
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#3B82F6' }}>
                                        {order.customer}
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {order.products.map((p, i) => (
                                                <div key={i}>
                                                    {p.name} <span style={{ color: '#1F3A93', fontWeight: '600' }}>({p.qty})</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                        {order.totalQty}
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                        {order.date}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        {order.status === 'Ready' ? (
                                            <span style={{ backgroundColor: '#3B82F6', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>Ready</span>
                                        ) : (
                                            <span style={{ backgroundColor: '#F97316', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>Waiting</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default DeliveryOrders;