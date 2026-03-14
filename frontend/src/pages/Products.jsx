import React from 'react';
import { Search, Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

export default function Products() {
    const products = [
        {
            sku: "SKU001",
            name: "Laptop HP ProBook 450",
            category: "Electronics",
            unit: "pcs",
            mainStock: 45,
            storeStock: 12,
            total: 57,
            reorder: 10,
            status: "In Stock"
        },
        {
            sku: "SKU002",
            name: "Office Chair Ergonomic",
            category: "Furniture",
            unit: "pcs",
            mainStock: 23,
            storeStock: 8,
            total: 31,
            reorder: 5,
            status: "In Stock"
        },
        {
            sku: "SKU003",
            name: "Printer Ink Cartridge",
            category: "Supplies",
            unit: "pcs",
            mainStock: 8,
            storeStock: 4,
            total: 12,
            reorder: 20,
            status: "Low Stock"
        },
        {
            sku: "SKU004",
            name: "Wireless Mouse",
            category: "Electronics",
            unit: "pcs",
            mainStock: 67,
            storeStock: 21,
            total: 88,
            reorder: 15,
            status: "In Stock"
        },
        {
            sku: "SKU005",
            name: "A4 Paper Ream",
            category: "Supplies",
            unit: "ream",
            mainStock: 3,
            storeStock: 2,
            total: 5,
            reorder: 50,
            status: "Low Stock"
        }
    ];

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
                    <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600' }}>
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
                    <table className="table" style={{ width: '100%' }}>
                        <thead style={{ backgroundColor: '#F9FAFB' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>SKU</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Product Name</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Category</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Unit</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Stock Locations</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Total Stock</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Reorder Level</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px' }}>Status</th>
                                <th style={{ padding: '16px 24px', color: '#1F3A93', fontWeight: '700', fontSize: '12px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, index) => (
                                <tr key={index} style={{ borderBottom: index < products.length - 1 ? '1px solid #E5E7EB' : 'none', backgroundColor: '#fff' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#1F3A93' }}>{p.sku}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{p.name}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ padding: '4px 12px', borderRadius: '16px', border: '1px solid #BAE6FD', color: '#0284C7', fontSize: '12px', backgroundColor: '#F0F9FF' }}>
                                            {p.category}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{p.unit}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                                        <div>Main Warehouse: <span style={{ color: '#1F3A93', fontWeight: '600' }}>{p.mainStock}</span></div>
                                        <div style={{ marginTop: '4px' }}>Store A: <span style={{ color: '#1F3A93', fontWeight: '600' }}>{p.storeStock}</span></div>
                                    </td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#1F3A93' }}>{p.total}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '13px', color: '#6B7280' }}>{p.reorder}</td>
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
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#1F3A93'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
                                                <Pencil size={18} />
                                            </button>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }} onMouseOver={(e) => e.currentTarget.style.color = '#EF4444'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}