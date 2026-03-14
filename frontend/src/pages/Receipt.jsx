import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getReceipts, createReceipt, getProducts } from '../services/api';
import '../styles/dashboard.css';

const Receipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [availableProducts, setAvailableProducts] = useState([]);
    
    // Default setup for a new receipt
    const [newReceipt, setNewReceipt] = useState({
        destination_hub_id: 1, // Defaulting to hub 1 for simplicity
        remarks: '',
        items: [{ product_id: '', quantity: 1 }]
    });

    useEffect(() => {
        fetchReceipts();
        fetchProductsList();
    }, []);

    const fetchProductsList = async () => {
        try {
            const res = await getProducts();
            if (res.data.success) {
                setAvailableProducts(res.data.products);
                // Set default product selection if products exist
                if (res.data.products.length > 0) {
                    setNewReceipt(prev => ({
                        ...prev,
                        items: [{ product_id: res.data.products[0].product_id, quantity: 1 }]
                    }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch products for dropdown:", error);
        }
    };

    const fetchReceipts = async () => {
        try {
            const res = await getReceipts();
            if (res.data.success) {
                setReceipts(res.data.receipts);
            }
        } catch (error) {
            console.error("Failed to fetch receipts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddReceipt = async (e) => {
        e.preventDefault();
        try {
            // Clean up items (ensure integers)
            const cleanItems = newReceipt.items.map(item => ({
                product_id: parseInt(item.product_id, 10),
                quantity: parseInt(item.quantity, 10)
            }));
            
            const payload = { ...newReceipt, items: cleanItems };
            const res = await createReceipt(payload);
            
            if (res.data.success) {
                setIsAddModalOpen(false);
                fetchReceipts();
                // Reset form
                setNewReceipt({
                    destination_hub_id: 1,
                    remarks: '',
                    items: [{ product_id: availableProducts.length > 0 ? availableProducts[0].product_id : '', quantity: 1 }]
                });
            }
        } catch (error) {
            console.error("Failed to create receipt:", error);
            alert("Failed to create receipt. Check console.");
        }
    };

    const handleAddItemRow = () => {
        setNewReceipt(prev => ({
            ...prev,
            items: [...prev.items, { product_id: availableProducts.length > 0 ? availableProducts[0].product_id : '', quantity: 1 }]
        }));
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...newReceipt.items];
        updatedItems[index][field] = value;
        setNewReceipt(prev => ({ ...prev, items: updatedItems }));
    };

    const handleRemoveItemRow = (index) => {
        if (newReceipt.items.length > 1) {
            const updatedItems = newReceipt.items.filter((_, i) => i !== index);
            setNewReceipt(prev => ({ ...prev, items: updatedItems }));
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Done': return { bg: '#22C55E', color: 'white' };
            case 'Waiting': return { bg: '#F97316', color: 'white' };
            case 'Ready': return { bg: '#3B82F6', color: 'white' };
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Receipts</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage incoming stock receipts</p>
                    </div>
                    
                    <button onClick={() => setIsAddModalOpen(true)} className="primary-btn" style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Plus size={16} /> New Receipt
                    </button>
                </div>

                {/* Table Card */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>Loading receipts...</div>
                    ) : (
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
                                {receipts.map((receipt, index) => {
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
                                                {formatDate(receipt.date)}
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
                    )}
                </div>

            </div>

            {/* New Receipt Modal */}
            {isAddModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '90%', maxWidth: '600px', padding: '24px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>Create New Receipt</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddReceipt} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Destination Hub ID</label>
                                    <input required type="number" value={newReceipt.destination_hub_id} onChange={(e) => setNewReceipt({...newReceipt, destination_hub_id: parseInt(e.target.value) || 1})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Remarks</label>
                                    <input type="text" placeholder="Optional notes" value={newReceipt.remarks} onChange={(e) => setNewReceipt({...newReceipt, remarks: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>

                            <div style={{ marginTop: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', margin: 0 }}>Products Received</h3>
                                    <button type="button" onClick={handleAddItemRow} style={{ background: 'none', border: 'none', color: '#3B82F6', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>+ Add Row</button>
                                </div>
                                
                                {newReceipt.items.map((item, index) => (
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
                                                    <option key={p.product_id} value={p.product_id}>{p.name} ({p.sku})</option>
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
                                        {newReceipt.items.length > 1 && (
                                            <button type="button" onClick={() => handleRemoveItemRow(index)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FEE2E2' }}>
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#22C55E', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Complete Receipt</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Receipts;