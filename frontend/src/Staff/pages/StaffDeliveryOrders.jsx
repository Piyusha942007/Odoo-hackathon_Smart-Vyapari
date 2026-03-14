import React from 'react';
import { Truck, Search, ChevronDown, Package } from 'lucide-react';

const StaffDeliveryOrders = () => {
  const deliveryOrders = [
    {
      id: "DEL-2024-0289",
      customer: "Retail Store Alpha",
      dueDate: "2024-03-15",
      items: 12,
      totalQty: 350,
      status: "Ready",
    },
    {
      id: "DEL-2024-0290",
      customer: "Distribution Center B",
      dueDate: "2024-03-15",
      items: 8,
      totalQty: 220,
      status: "Waiting",
    },
    {
      id: "DEL-2024-0291",
      customer: "Wholesale Partner",
      dueDate: "2024-03-16",
      items: 15,
      totalQty: 480,
      status: "Draft",
    },
    {
      id: "DEL-2024-0288",
      customer: "Online Order #5423",
      dueDate: "2024-03-14",
      items: 5,
      totalQty: 85,
      status: "Done",
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Ready': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Waiting': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Draft': return 'bg-slate-100 text-slate-700 border border-slate-200';
      case 'Done': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Truck size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Delivery Orders</h1>
            <p className="text-slate-500 text-sm mt-0.5">Pick, pack, and ship outgoing orders</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search delivery orders or customers..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="w-48 relative shrink-0">
          <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>Ready</option>
            <option>Waiting</option>
            <option>Draft</option>
            <option>Done</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e3a8a] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Delivery ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Customer</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Due Date</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Items</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Total Qty</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Status</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveryOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-[#1e3a8a]">
                      <Truck size={14} className="text-[#38bdf8]" />
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {order.dueDate}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {order.totalQty}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-md text-xs font-bold ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {order.status === 'Ready' && (
                        <button className="flex items-center gap-1.5 bg-[#4cb3ed] hover:bg-sky-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm">
                          <Package size={14} /> Pick & Pack
                        </button>
                      )}
                      <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-colors">
                        View
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
};

export default StaffDeliveryOrders;
