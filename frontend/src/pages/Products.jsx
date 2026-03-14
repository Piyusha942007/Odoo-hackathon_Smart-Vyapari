import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, AlertTriangle, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getProducts, createProduct } from '../services/api';
import '../styles/dashboard.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        sku: '',
        name: '',
        category: '',
        material: '',
        base_price: '',
        reorder_level: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            if (res.data.success) {
                setProducts(res.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await createProduct({
                ...newProduct,
                base_price: parseFloat(newProduct.base_price),
                reorder_level: parseInt(newProduct.reorder_level, 10)
            });
            if (res.data.success) {
                setIsAddModalOpen(false);
                fetchProducts();
                setNewProduct({ sku: '', name: '', category: '', material: '', base_price: '', reorder_level: '' });
            }
        } catch (error) {
            console.error("Failed to add product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Products</h1>
                        <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Manage your product inventory</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}>
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="card" style={{ padding: '0', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>

                    {/* Top Filters */}
                    <div style={{ display: 'flex', gap: '16px', padding: '20px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff', alignItems: 'center' }}>
                        <div style={{ flex: '1', position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search by product name or SKU..."
                                style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', color: '#374151', boxSizing: 'border-box', backgroundColor: '#F9FAFB' }}
                            />
                        </div>
                        <div style={{ width: '250px' }}>
                            <select style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', color: '#1F2937', fontWeight: '500', appearance: 'auto', backgroundColor: '#F9FAFB' }}>
                                <option>All Categories</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading products...</div>
                    ) : (
                        <table className="table" style={{ width: '100%' }}>
                            <thead style={{ backgroundColor: '#F9FAFB' }}>
                                <tr>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>SKU</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Product Name</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Category</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Material</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Total Stock</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Reorder Level</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Status</th>
                                    <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p, index) => {
                                    const isLowStock = p.total_stock <= p.reorder_level;
                                    return (
                                        <tr key={index} style={{ borderBottom: index < products.length - 1 ? '1px solid #E5E7EB' : 'none', backgroundColor: '#fff' }}>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>{p.sku}</td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                                {p.name}
                                                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>Base Price: ${p.base_price}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <span style={{ padding: '4px 12px', borderRadius: '16px', border: '1px solid #BAE6FD', color: '#0284C7', fontSize: '12px', backgroundColor: '#F0F9FF' }}>
                                                    {p.category || 'Uncategorized'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{p.material || 'N/A'}</td>
                                            <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#1F3A93' }}>{p.total_stock}</td>
                                            <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{p.reorder_level}</td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    {!isLowStock ? (
                                                        <span style={{ backgroundColor: '#22C55E', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                                            In Stock
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span style={{ backgroundColor: '#F97316', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                                                                Low Stock
                                                            </span>
                                                            <AlertTriangle size={16} color="#F97316" />
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#1F3A93'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'} title="Edit">
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#EF4444'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'} title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '90%', maxWidth: '500px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>Create New Product</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>SKU *</label>
                                    <input required type="text" value={newProduct.sku} onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Category</label>
                                    <input type="text" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                            
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Product Name *</label>
                                <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Material</label>
                                    <input type="text" value={newProduct.material} onChange={(e) => setNewProduct({...newProduct, material: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Base Price *</label>
                                    <input required type="number" step="0.01" value={newProduct.base_price} onChange={(e) => setNewProduct({...newProduct, base_price: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Reorder Lvl</label>
                                    <input required type="number" value={newProduct.reorder_level} onChange={(e) => setNewProduct({...newProduct, reorder_level: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', boxSizing: 'border-box' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#3B82F6', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}