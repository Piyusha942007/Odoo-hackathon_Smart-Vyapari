import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

export default function WarehouseSettings() {
    return (
        <div>
            <Sidebar />

            <div className="main">
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 className="page-title" style={{ margin: '0 0 4px 0' }}>Warehouse Settings</h1>
                    <p className="page-sub" style={{ margin: 0, fontSize: '14px' }}>Configure warehouse and system preferences</p>
                </div>

                {/* Warehouse Locations */}
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '20px' }}>Warehouse Locations</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Main Warehouse</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>123 Industrial Road, City</div>
                            </div>
                            <button style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>Edit</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Store A</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>456 Market Street, City</div>
                            </div>
                            <button style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>Edit</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Store B</div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>789 Commerce Ave, City</div>
                            </div>
                            <button style={{ backgroundColor: 'white', border: '1px solid #E5E7EB', padding: '6px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>Edit</button>
                        </div>
                    </div>

                    <button className="primary-btn" style={{ fontSize: '13px', fontWeight: '600' }}>Add New Location</button>
                </div>

                {/* Notification Settings */}
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '0' }}>Notification Settings</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F3F4F6' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Low Stock Alerts</div>
                                <div style={{ fontSize: '13px', color: '#9CA3AF' }}>Get notified when products reach reorder level</div>
                            </div>
                            <div style={{ width: '40px', height: '22px', backgroundColor: '#1F3A93', borderRadius: '11px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #F3F4F6' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Pending Operations</div>
                                <div style={{ fontSize: '13px', color: '#9CA3AF' }}>Alerts for pending receipts and deliveries</div>
                            </div>
                            <div style={{ width: '40px', height: '22px', backgroundColor: '#1F3A93', borderRadius: '11px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '4px' }}>Stock Discrepancies</div>
                                <div style={{ fontSize: '13px', color: '#9CA3AF' }}>Notification for inventory adjustments</div>
                            </div>
                            <div style={{ width: '40px', height: '22px', backgroundColor: '#1F3A93', borderRadius: '11px', position: 'relative', cursor: 'pointer' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Default Settings */}
                <div className="card">
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F3A93', marginTop: 0, marginBottom: '20px' }}>Default Settings</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '8px' }}>Default Warehouse</label>
                            <input 
                                type="text" 
                                value="Main Warehouse" 
                                readOnly
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E5E7EB', color: '#6B7280', fontSize: '13px', outline: 'none', backgroundColor: '#F9FAFB', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#1F3A93', marginBottom: '8px' }}>Default Reorder Level</label>
                            <input 
                                type="text" 
                                value="10" 
                                readOnly
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #E5E7EB', color: '#6B7280', fontSize: '13px', outline: 'none', backgroundColor: '#F9FAFB', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    <button className="primary-btn" style={{ fontSize: '13px', fontWeight: '600' }}>Save Settings</button>
                </div>

            </div>
        </div>
    );
}