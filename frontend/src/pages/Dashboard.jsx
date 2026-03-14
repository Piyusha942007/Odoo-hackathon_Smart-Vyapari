import React, { useState, useEffect } from 'react';
import {
    Package, AlertTriangle, FileInput, Truck,
    ArrowRightLeft, AlertCircle
} from 'lucide-react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import AddProductModal from '../components/AddProductModal';
import '../styles/dashboard.css';

const stockTrendData = [
    { name: 'Jan', TotalStock: 2500, Receipts: 400, Deliveries: 300 },
    { name: 'Feb', TotalStock: 2300, Receipts: 350, Deliveries: 200 },
    { name: 'Mar', TotalStock: 2400, Receipts: 500, Deliveries: 450 }
];

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [hubs, setHubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [prodRes, recRes, delRes, hubsRes] = await Promise.all([
                    fetch('http://localhost:5000/api/products'),
                    fetch('http://localhost:5000/api/receipts'),
                    fetch('http://localhost:5000/api/deliveries'),
                    fetch('http://localhost:5000/api/hubs')
                ]);

                const prods = await prodRes.json();
                
                // Mocking stock since we don't have inventory view joined yet
                const mappedProds = prods.map(p => {
                    const total = Math.floor(Math.random() * 50) + 1; // Mock total
                    return {
                        ...p,
                        total,
                        isLowStock: total <= (p.reorder_level || 10),
                        isOutOfStock: total === 0
                    };
                });

                setProducts(mappedProds);
                setReceipts(await recRes.json());
                setDeliveries(await delRes.json());
                setHubs(await hubsRes.json());
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const lowStockCount = products.filter(p => p.isLowStock && !p.isOutOfStock).length;
    const outOfStockCount = products.filter(p => p.isOutOfStock).length;
    
    // Group products by category to feed the BarChart
    const categoryMap = products.reduce((acc, p) => {
        const cat = p.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + 1; // Count unique products per category
        return acc;
    }, {});
    
    const categoryData = Object.keys(categoryMap).map(key => ({
        name: key,
        Quantity: categoryMap[key]
    }));

    // Extract unique categories for filter
    const uniqueCategories = Object.keys(categoryMap);

    const handleProductAdded = (newProduct) => {
        // Mock stock values for new product
        const total = Math.floor(Math.random() * 50) + 1;
        const productWithStock = {
            ...newProduct,
            total,
            isLowStock: total <= (newProduct.reorder_level || 10),
            isOutOfStock: total === 0
        };
        setProducts(prev => [...prev, productWithStock]);
    };

    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* Header aligned Dashboard Items */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>Dashboard Overview</h2>
                    <button 
                        onClick={() => setIsProductModalOpen(true)}
                        className="primary-btn" 
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', padding: '10px 16px', backgroundColor: '#1F3A93', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        <Package size={16} /> Add Product
                    </button>
                </div>

                <AddProductModal 
                    isOpen={isProductModalOpen} 
                    onClose={() => setIsProductModalOpen(false)} 
                    onSuccess={handleProductAdded} 
                />

                {/* KPI Cards Grid */}
                <div className="kpi-grid" style={{ marginBottom: '30px' }}>
                    
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Total Products</div>
                            <Package size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>{products.length}</div>
                        <span className="badge badge-green">Live DB</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Low Stock</div>
                            <AlertTriangle size={18} color="#F97316" />
                        </div>
                        <div className="kpi-value" style={{ color: '#F97316', marginBottom: '15px' }}>{lowStockCount}</div>
                        <span className="badge badge-orange">Needs Reorder</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Out of Stock</div>
                            <AlertCircle size={18} color="#EF4444" />
                        </div>
                        <div className="kpi-value" style={{ color: '#EF4444', marginBottom: '15px' }}>{outOfStockCount}</div>
                        <span className="badge" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>Critical</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Receipts</div>
                            <FileInput size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>{receipts.length}</div>
                        <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>Logged Info</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Delivery Orders</div>
                            <Truck size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>{deliveries.length}</div>
                        <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>In Progress</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Warehouses</div>
                            <ArrowRightLeft size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>{hubs.length}</div>
                        <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>Active Hubs</span>
                    </div>

                </div>

                {/* Filters */}
                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '20px' }}>Filters</h3>
                    <div className="card" style={{ padding: '0', display: 'flex', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                        
                        <div style={{ flex: '1', padding: '15px 20px', borderRight: '1px solid #E5E7EB' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>Document Type</label>
                            <select style={{ width: '100%', fontSize: '13px', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 12px', outline: 'none', appearance: 'auto', backgroundColor: '#fff' }}>
                                <option>All Documents</option>
                            </select>
                        </div>
                        
                        <div style={{ flex: '1', padding: '15px 20px', borderRight: '1px solid #E5E7EB' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>Status</label>
                            <select style={{ width: '100%', fontSize: '13px', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 12px', outline: 'none', appearance: 'auto', backgroundColor: '#fff' }}>
                                <option>All Status</option>
                            </select>
                        </div>
                        
                        <div style={{ flex: '1', padding: '15px 20px', borderRight: '1px solid #E5E7EB' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>Warehouse</label>
                            <select style={{ width: '100%', fontSize: '13px', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 12px', outline: 'none', appearance: 'auto', backgroundColor: '#fff' }}>
                                <option>All Warehouses</option>
                                {hubs.map(hub => (
                                    <option key={hub.hub_id} value={hub.hub_id}>{hub.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={{ flex: '1', padding: '15px 20px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>Category</label>
                            <select style={{ width: '100%', fontSize: '13px', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 12px', outline: 'none', appearance: 'auto', backgroundColor: '#fff' }}>
                                <option>All Categories</option>
                                {uniqueCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                </div>

                {/* Charts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginBottom: '30px' }}>
                    <div className="card">
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '25px' }}>Stock Trends Over Time</h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stockTrendData} margin={{ top: 5, right: 30, bottom: 20, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#6B7280' }} tickLine={true} axisLine={{ stroke: '#9CA3AF' }} dy={10} />
                                    <YAxis tick={{ fontSize: 13, fill: '#6B7280' }} tickLine={true} axisLine={{ stroke: '#9CA3AF' }} dx={-10} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#4B5563', bottom: '0px' }} />
                                    <Line type="monotone" dataKey="TotalStock" name="Total Stock" stroke="#1F3A93" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="Receipts" name="Receipts" stroke="#3DA9FC" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="Deliveries" name="Deliveries" stroke="#9CA3AF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="card">
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '25px' }}>Stock by Category</h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryData} margin={{ top: 5, right: 30, bottom: 20, left: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#6B7280' }} tickLine={true} axisLine={{ stroke: '#9CA3AF' }} dy={10} />
                                    <YAxis tick={{ fontSize: 13, fill: '#6B7280' }} tickLine={true} axisLine={{ stroke: '#9CA3AF' }} dx={-10} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} cursor={{ fill: 'transparent' }} />
                                    <Legend iconType="square" wrapperStyle={{ fontSize: '13px', color: '#4B5563', bottom: '0px' }} />
                                    <Bar dataKey="Quantity" name="Quantity" fill="#5EADDF" radius={[2, 2, 0, 0]} maxBarSize={100} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                <div className="card" style={{ borderLeft: '4px solid #F97316' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                        <AlertTriangle size={18} color="#F97316" />
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', margin: 0 }}>Active Alerts</h3>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ backgroundColor: '#FFF7ED', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <AlertTriangle size={20} color="#F97316" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>2 products below reorder level</div>
                                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Immediate action required</div>
                                </div>
                            </div>
                            <span style={{ backgroundColor: '#F97316', color: 'white', padding: '6px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Low Stock</span>
                        </div>
                        
                        <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <FileInput size={20} color="#3B82F6" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>2 pending receipts</div>
                                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Awaiting validation</div>
                                </div>
                            </div>
                            <span style={{ backgroundColor: '#3B82F6', color: 'white', padding: '6px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Pending</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}