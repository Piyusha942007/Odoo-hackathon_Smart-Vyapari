import React from 'react';
import { 
  Download, Truck, ArrowLeftRight, Package, 
  AlertTriangle, Plus, ClipboardList 
} from 'lucide-react';

const StaffDashboard = () => {
  const lowStockItems = [
    { sku: 'SKU-001-2024', name: 'Widget Pro 500', stock: 5, min: 20, loc: 'Rack A-12', status: 'Low Stock' },
    { sku: 'SKU-023-2024', name: 'Connector XL', stock: 0, min: 15, loc: 'Rack B-05', status: 'Out of Stock' },
    { sku: 'SKU-045-2024', name: 'Assembly Kit', stock: 8, min: 25, loc: 'Rack C-08', status: 'Low Stock' },
    { sku: 'SKU-078-2024', name: 'Mounting Bracket', stock: 3, min: 30, loc: 'Rack D-15', status: 'Low Stock' },
    { sku: 'SKU-102-2024', name: 'Cable Set Premium', stock: 12, min: 40, loc: 'Rack A-20', status: 'Low Stock' },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Warehouse Dashboard</h1>
          <p>Monitor operations and stock levels</p>
        </div>
        <select className="warehouse-select">
          <option>Warehouse 1 - Main</option>
        </select>
      </div>

      {/* Top Stats Cards */}
      <div className="stats-row">
        <StatCard title="Pending Receipts" value="12" icon={<Download />} color="blue" />
        <StatCard title="Pending Deliveries" value="8" icon={<Truck />} color="sky" />
        <StatCard title="Internal Transfers Scheduled" value="5" icon={<ArrowLeftRight />} color="sky-dark" />
        <StatCard title="Total Products" value="1,248" icon={<Package />} color="navy" />
      </div>

      {/* Low Stock Alert Section */}
      <div className="alert-section">
        <div className="alert-header">
          <AlertTriangle size={20} color="#dc2626" />
          <div>
            <h3>Low Stock / Out of Stock Alerts</h3>
            <p>Items requiring immediate attention</p>
          </div>
        </div>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Current Stock</th>
              <th>Min Required</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((item, idx) => (
              <tr key={idx}>
                <td className="sku-text">{item.sku}</td>
                <td>{item.name}</td>
                <td className="stock-count">{item.stock}</td>
                <td className="min-count">{item.min}</td>
                <td>{item.loc}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {item.status === 'Low Stock' ? '⚠️' : '📉'} {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        <div className="card recent-activity">
          <h3>Recent Activity</h3>
          <ActivityItem type="Receipt" id="RCP-2024-0156" time="10 mins ago" status="Ready" />
          <ActivityItem type="Delivery" id="DEL-2024-0289" time="25 mins ago" status="Done" />
          <ActivityItem type="Transfer" id="TRF-2024-0421" time="1 hour ago" status="Waiting" />
          <ActivityItem type="Adjustment" id="ADJ-2024-0087" time="2 hours ago" status="Done" />
        </div>

        <div className="card quick-actions">
          <h3>Quick Actions</h3>
          <button className="btn btn-navy"><Download size={18} /> New Receipt</button>
          <button className="btn btn-sky"><Truck size={18} /> New Delivery Order</button>
          <button className="btn btn-navy-light"><ArrowLeftRight size={18} /> Internal Transfer</button>
          <button className="btn btn-grey"><ClipboardList size={18} /> Inventory Adjustment</button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, icon, color }) => (
  <div className={`stat-card border-${color}`}>
    <div className="stat-info">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
    </div>
    <div className={`stat-icon bg-${color}`}>{icon}</div>
  </div>
);

const ActivityItem = ({ type, id, time, status }) => (
  <div className="activity-item">
    <div className="activity-info">
      <strong>{type}</strong>
      <span>{id}</span>
    </div>
    <div className="activity-meta">
      <span className={`badge-${status.toLowerCase()}`}>{status}</span>
      <span className="time">{time}</span>
    </div>
  </div>
);

export default StaffDashboard;