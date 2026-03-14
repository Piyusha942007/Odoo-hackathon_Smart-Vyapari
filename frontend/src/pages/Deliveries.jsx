import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const DeliveryOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/deliveries');
                const data = await response.json();
                
                const formatted = data.map(dbOrder => ({
                    id: `DO-${dbOrder.order_id.toString().padStart(3, '0')}`,
                    customer: dbOrder.customer_name,
                    productName: "Multiple Products", // Since we didn't join delivery_items
                    totalQty: Math.floor(Math.random() * 50) + 1, // Mock
                    date: new Date(dbOrder.order_date).toISOString().split('T')[0],
                    status: dbOrder.status || 'Waiting'
                }));

                setOrders(formatted);
            } catch (error) {
                console.error("Failed to fetch deliveries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Done': return { bg: '#22C55E', color: 'white' };
            case 'Waiting': return { bg: '#F97316', color: 'white' };
            case 'Ready': return { bg: '#3B82F6', color: 'white' };
            case 'Cancelled': return { bg: '#EF4444', color: 'white' };
            default: return { bg: '#6B7280', color: 'white' };
        }
    };

    return (
        <div>
            <Sidebar />

            <div className="main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Delivery Orders</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage outgoing customer shipments</p>
                    </div>
                    
                    <button className="primary-btn" style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px', lineHeight: '1' }}>+</span> New Delivery Order
                    </button>
                </div>

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
                            {loading ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>Loading deliveries...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ padding: '16px 24px', textAlign: 'center', color: '#6B7280' }}>No deliveries found in database.</td>
                                </tr>
                            ) : orders.map((order, index) => {
                                const statusStyle = getStatusStyle(order.status);
                                return (
                                    <tr key={order.id} style={{ borderBottom: index === orders.length - 1 ? 'none' : '1px solid #E5E7EB' }} className="table-row">
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {order.id}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#3B82F6' }}>
                                            {order.customer}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {order.productName}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>
                                            {order.totalQty}
                                        </td>
                                        <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                            {order.date}
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
                                                {order.status}
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

export default DeliveryOrders;
