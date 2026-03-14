import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AddProductModal from '../components/AddProductModal';
import '../styles/dashboard.css';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                
                // Map DB schema to UI structure (mocking stock for now as it needs a join with inventory)
                const formatted = data.map(dbProduct => ({
                    id: dbProduct.product_id,
                    sku: dbProduct.sku,
                    name: dbProduct.name,
                    category: dbProduct.category || "Uncategorized",
                    unit: dbProduct.unit || "pcs", // Fetching unit from DB
                    mainStock: Math.floor(Math.random() * 50) + 5, // Mock until inventory join
                    storeStock: Math.floor(Math.random() * 20) + 1, // Mock until inventory join
                    total: 0,
                    reorder: dbProduct.reorder_level || 10,
                    status: "In Stock"
                }));

                // Calculate total and status
                formatted.forEach(p => {
                    p.total = p.mainStock + p.storeStock;
                    p.status = p.total <= p.reorder ? "Low Stock" : "In Stock";
                });

                setProducts(formatted);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingId(product.id);
        setEditData({ ...product });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editData.name,
                    category: editData.category,
                    unit: editData.unit,
                    reorder_level: editData.reorder
                })
            });
            
            if (response.ok) {
                // Update local state without refetching all
                setProducts(products.map(p => {
                    if (p.id === id) {
                        const updated = { ...p, ...editData };
                        updated.status = updated.total <= updated.reorder ? "Low Stock" : "In Stock";
                        return updated;
                    }
                    return p;
                }));
                setEditingId(null);
            } else {
                console.error("Failed to save product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    const handleProductAdded = (newProduct) => {
        const formatted = {
            id: newProduct.product_id,
            sku: newProduct.sku,
            name: newProduct.name,
            category: newProduct.category || "Uncategorized",
            unit: newProduct.unit || "pcs",
            mainStock: Math.floor(Math.random() * 50) + 5,
            storeStock: Math.floor(Math.random() * 20) + 1,
            reorder: newProduct.reorder_level || 10,
        };
        formatted.total = formatted.mainStock + formatted.storeStock;
        formatted.status = formatted.total <= formatted.reorder ? "Low Stock" : "In Stock";
        
        setProducts(prev => [...prev, formatted]);
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
                    <button 
                        onClick={() => setIsProductModalOpen(true)}
                        className="primary-btn" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}
                    >
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                <AddProductModal 
                    isOpen={isProductModalOpen} 
                    onClose={() => setIsProductModalOpen(false)} 
                    onSuccess={handleProductAdded} 
                />

                {/* Main Content Area */}
                <div className="card" style={{ padding: '0', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>

                    {/* Top Filters */}
                    <div style={{ display: 'flex', gap: '16px', padding: '20px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#fff', alignItems: 'center' }}>
                        <div style={{ flex: '1', position: 'relative' }}>
                            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Search by product name or SKU..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', color: '#374151', boxSizing: 'border-box', backgroundColor: '#F9FAFB' }}
                            />
                        </div>
                        <div style={{ width: '250px' }}>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none', color: '#1F2937', fontWeight: '500', appearance: 'auto', backgroundColor: '#F9FAFB' }}
                            >
                                <option value="All Categories">All Categories</option>
                                {[...new Set(products.map(p => p.category))].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="table" style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: '#F9FAFB' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>SKU</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Product Name</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Category</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Unit</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Stock Locations</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Units Ordered</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Status</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products
                                .filter(p => {
                                    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
                                    const matchesCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
                                    return matchesSearch && matchesCategory;
                                })
                                .map((p, index, filteredArray) => {
                                const isEditing = editingId === p.id;
                                return (
                                <tr key={p.id} style={{ borderBottom: index < filteredArray.length - 1 ? '1px solid #E5E7EB' : 'none', backgroundColor: '#fff' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>{p.sku}</td>
                                    
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                value={editData.name} 
                                                onChange={(e) => setEditData({...editData, name: e.target.value})}
                                                style={{ padding: '4px 8px', width: '100%', border: '1px solid #D1D5DB', borderRadius: '4px' }} 
                                            />
                                        ) : p.name}
                                    </td>
                                    
                                    <td style={{ padding: '16px 24px' }}>
                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                value={editData.category} 
                                                onChange={(e) => setEditData({...editData, category: e.target.value})}
                                                style={{ padding: '4px 8px', width: '80px', border: '1px solid #D1D5DB', borderRadius: '4px' }} 
                                            />
                                        ) : (
                                            <span style={{ padding: '4px 12px', borderRadius: '16px', border: '1px solid #BAE6FD', color: '#0284C7', fontSize: '12px', backgroundColor: '#F0F9FF' }}>
                                                {p.category}
                                            </span>
                                        )}
                                    </td>

                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>
                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                value={editData.unit} 
                                                onChange={(e) => setEditData({...editData, unit: e.target.value})}
                                                style={{ padding: '4px 8px', width: '60px', border: '1px solid #D1D5DB', borderRadius: '4px' }} 
                                            />
                                        ) : p.unit}
                                    </td>

                                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                                        <div>Main Warehouse: <span style={{ color: '#1F3A93', fontWeight: '600' }}>{p.mainStock}</span></div>
                                        <div style={{ marginTop: '4px' }}>Store A: <span style={{ color: '#1F3A93', fontWeight: '600' }}>{p.storeStock}</span></div>
                                    </td>

                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#1F3A93' }}>{p.total}</td>
                                    
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {p.status === 'In Stock' ? (
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
                                            {isEditing ? (
                                                <>
                                                    <button onClick={() => handleSave(p.id)} style={{ padding: '6px 12px', backgroundColor: '#1F3A93', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Save</button>
                                                    <button onClick={handleCancel} style={{ padding: '6px 12px', backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEdit(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#1F3A93'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#EF4444'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}