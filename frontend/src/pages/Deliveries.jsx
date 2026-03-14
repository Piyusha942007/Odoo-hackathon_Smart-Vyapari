import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getDeliveries, createDelivery, getProducts } from '../services/api';
import '../styles/dashboard.css';

const DeliveryOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [availableProducts, setAvailableProducts] = useState([]);

    const [newDelivery, setNewDelivery] = useState({
        source_hub_id: 1, // Defaulting to hub 1
        customer_name: '',
        total_amount: '',
        remarks: '',
        items: [{ product_id: '', quantity: 1 }]
    });

    useEffect(() => {
        fetchDeliveries();
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        try {
            const res = await getProducts();
            if (res.data.success) {
                setAvailableProducts(res.data.products);
                if (res.data.products.length > 0) {
                    setNewDelivery(prev => ({
                        ...prev,
                        items: [{ product_id: res.data.products[0].product_id, quantity: 1 }]
                    }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch products for dropdown:", error);
        }
    };

    const fetchDeliveries = async () => {
        try {
            const res = await getDeliveries();
            if (res.data.success) {
                setOrders(res.data.deliveries);
            }
        } catch (error) {
            console.error("Failed to fetch deliveries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDelivery = async (e) => {
        e.preventDefault();
        try {
            const cleanItems = newDelivery.items.map(item => ({
                product_id: parseInt(item.product_id, 10),
                quantity: parseInt(item.quantity, 10)
            }));
            
            const payload = { 
                ...newDelivery, 
                total_amount: parseFloat(newDelivery.total_amount) || 0,
                items: cleanItems 
            };
            const res = await createDelivery(payload);
            
            if (res.data.success) {
                setIsAddModalOpen(false);
                fetchDeliveries();
                // Refresh product inventory if needed, but we do it on load
                setNewDelivery({
                    source_hub_id: 1,
                    customer_name: '',
                    total_amount: '',
                    remarks: '',
                    items: [{ product_id: availableProducts.length > 0 ? availableProducts[0].product_id : '', quantity: 1 }]
                });
            }
        } catch (error) {
            console.error("Failed to create delivery:", error);
            // In a real app, read error.response.data.message for inventory shortage msg
            alert(error.response?.data?.message || "Failed to create delivery order. Ensure there is enough stock.");
        }
    };

    const handleAddItemRow = () => {
        setNewDelivery(prev => ({
            ...prev,
            items: [...prev.items, { product_id: availableProducts.length > 0 ? availableProducts[0].product_id : '', quantity: 1 }]
        }));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...newDelivery.items];
        updatedItems[index][field] = value;
        setNewDelivery(prev => ({ ...prev, items: updatedItems }));
    };

    const handleRemoveItemRow = (index) => {
        if (newDelivery.items.length > 1) {
            const updatedItems = newDelivery.items.filter((_, i) => i !== index);
            setNewDelivery(prev => ({ ...prev, items: updatedItems }));
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Delivery Orders</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage outgoing deliveries</p>
                    </div>
                    
                    <button onClick={() => setIsAddModalOpen(true)} className="primary-btn" style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Plus size={16} /> New Delivery Order
                    </button>
                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>Loading deliveries...</div>
                    ) : (
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
                                            {formatDate(order.date)}
                                        </td>
                                        <td style={{ padding: '16px 24px' }}>
                                            {order.status === 'Done' || order.status === 'Ready' ? (
                                                <span style={{ backgroundColor: '#3B82F6', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{order.status}</span>
                                            ) : (
                                                <span style={{ backgroundColor: '#F97316', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>Waiting</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

            {/* New Delivery Modal */}
            {isAddModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '90%', maxWidth: '600px', padding: '24px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>Create Delivery Order</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddDelivery} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Customer Name *</label>
                                    <input required type="text" value={newDelivery.customer_name} onChange={(e) => setNewDelivery({...newDelivery, customer_name: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Total Amount</label>
                                    <input type="number" step="0.01" value={newDelivery.total_amount} onChange={(e) => setNewDelivery({...newDelivery, total_amount: e.target.value})} placeholder="Optional" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Source Hub ID</label>
                                    <input required type="number" value={newDelivery.source_hub_id} onChange={(e) => setNewDelivery({...newDelivery, source_hub_id: parseInt(e.target.value) || 1})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Remarks</label>
                                    <input type="text" placeholder="Optional notes" value={newDelivery.remarks} onChange={(e) => setNewDelivery({...newDelivery, remarks: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', margin: 0 }}>Products to Deliver</h3>
                                    <button type="button" onClick={handleAddItemRow} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>+ Add Row</button>
                                </div>
                                
                                {newDelivery.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                                        <div style={{ flex: '1' }}>
                                            <select 
                                                required
                                                value={item.product_id}
                                                onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', backgroundColor: 'white' }}
                                            >
                                                <option value="" disabled>Select Product</option>
                                                {availableProducts.map(p => (
                                                    <option key={p.product_id} value={p.product_id}>
                                                        {p.name} (Stock: {p.total_stock})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div style={{ width: '100px' }}>
                                            <input 
                                                required 
                                                type="number" 
                                                min="1" 
                                                value={item.quantity} 
                                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} 
                                                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} 
                                            />
                                        </div>
                                        {newDelivery.items.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveItemRow(index)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEE2E2' }}>
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#3B82F6', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Create Delivery Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryOrders;