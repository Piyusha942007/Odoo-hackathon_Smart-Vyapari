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
import { getDashboardStats } from '../services/api';
import '../styles/dashboard.css';

const stockTrendData = [
    { name: 'Jan', TotalStock: 2500, Receipts: 400, Deliveries: 300 },
    { name: 'Feb', TotalStock: 2300, Receipts: 350, Deliveries: 200 },
    { name: 'Mar', TotalStock: 2400, Receipts: 500, Deliveries: 450 }
];

const categoryData = [
    { name: 'Electronics', Quantity: 150 },
    { name: 'Furniture', Quantity: 30 },
    { name: 'Supplies', Quantity: 15 }
];

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalPhysicalStock: 0,
        lowStockCount: 0,
        pendingDeliveries: 0,
        pendingReceipts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getDashboardStats();
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* KPI Cards Grid */}
                <div className="kpi-grid" style={{ marginBottom: '30px' }}>
                    
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Total Products / Total Stock</div>
                            <Package size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>
                            {loading ? '...' : `${stats.totalProducts} / ${stats.totalPhysicalStock}`}
                        </div>
                        <span className="badge badge-green">↗ in stock</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Low Stock Items</div>
                            <AlertTriangle size={18} color="#F97316" />
                        </div>
                        <div className="kpi-value" style={{ color: '#F97316', marginBottom: '15px' }}>
                            {loading ? '...' : stats.lowStockCount}
                        </div>
                        <span className="badge badge-orange">Needs Reorder</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Pending Receipts</div>
                            <FileInput size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>
                            {loading ? '...' : stats.pendingReceipts}
                        </div>
                        <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>Waiting</span>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div className="kpi-title">Pending Deliveries</div>
                            <Truck size={18} color="#3B82F6" />
                        </div>
                        <div className="kpi-value" style={{ color: '#1F3A93', marginBottom: '15px' }}>
                            {loading ? '...' : stats.pendingDeliveries}
                        </div>
                        <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>In Progress</span>
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
                            </select>
                        </div>
                        
                        <div style={{ flex: '1', padding: '15px 20px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#6B7280', fontWeight: '600', marginBottom: '10px' }}>Category</label>
                            <select style={{ width: '100%', fontSize: '13px', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '8px 12px', outline: 'none', appearance: 'auto', backgroundColor: '#fff' }}>
                                <option>All Categories</option>
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
                        {stats.lowStockCount > 0 && (
                            <div style={{ backgroundColor: '#FFF7ED', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <AlertTriangle size={20} color="#F97316" style={{ marginTop: '2px' }} />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>{stats.lowStockCount} products below reorder level</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Immediate action required</div>
                                    </div>
                                </div>
                                <span style={{ backgroundColor: '#F97316', color: 'white', padding: '6px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Low Stock</span>
                            </div>
                        )}
                        
                        {stats.pendingDeliveries > 0 && (
                            <div style={{ backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                    <Truck size={20} color="#3B82F6" style={{ marginTop: '2px' }} />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>{stats.pendingDeliveries} pending deliveries</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>Awaiting validation</div>
                                    </div>
                                </div>
                                <span style={{ backgroundColor: '#3B82F6', color: 'white', padding: '6px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Pending</span>
                            </div>
                        )}
                        
                        {stats.lowStockCount === 0 && stats.pendingDeliveries === 0 && (
                            <div style={{ padding: '16px', color: '#6B7280', fontSize: '13px' }}>
                                You are all caught up! No active alerts.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}