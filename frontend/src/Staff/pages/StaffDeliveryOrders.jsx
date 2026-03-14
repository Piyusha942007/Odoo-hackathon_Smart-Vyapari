import React from 'react';
import { Truck, Search, ChevronDown, Package } from 'lucide-react';
import { useState } from 'react';
import { useWarehouse } from '../context/WarehouseContext';

const StaffDeliveryOrders = () => {
  const { deliveries, validateDelivery } = useWarehouse();
  const [activeModalOrder, setActiveModalOrder] = useState(null);

  const handlePickAndPack = (order) => {
    setActiveModalOrder(order);
  };

  const handleValidate = () => {
    if (activeModalOrder) {
      validateDelivery(activeModalOrder.id);
      setActiveModalOrder(null);
    }
  };

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
              {deliveries.map((order) => (
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
                        <button 
                          onClick={() => handlePickAndPack(order)}
                          className="flex items-center gap-1.5 bg-[#4cb3ed] hover:bg-sky-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm"
                        >
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
      {/* Pick & Pack Modal */}
      {activeModalOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ebf5ff] text-[#4cb3ed] rounded-lg">
                  <Package size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1e3a8a]">Pick & Pack - {activeModalOrder.id}</h2>
                  <p className="text-sm text-slate-500 mt-1">Check off items as you pick them from their locations</p>
                </div>
              </div>
              <button onClick={() => setActiveModalOrder(null)} className="text-slate-400 hover:text-slate-600">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 bg-slate-50/50">
              <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm mb-4">
                <div className="text-xs text-slate-400 font-medium">Customer</div>
                <div className="text-[#1e3a8a] font-bold text-lg">{activeModalOrder.customer}</div>
              </div>
              
              <h3 className="font-bold text-[#1e3a8a] mb-3">Picking Checklist</h3>
              <div className="space-y-3">
                {/* Mock Item 1 */}
                <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-start gap-3 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="mt-1 w-5 h-5 border-2 border-slate-300 rounded flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-[#1e3a8a]">SKU-001-2024</div>
                        <div className="font-medium text-slate-700">Widget Pro 500</div>
                      </div>
                      <div className="bg-[#1e3a8a] text-white px-2 py-1 rounded text-xs font-bold">
                        Qty: 50
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Package size={12} className="text-slate-400"/> Location: Rack A-12
                    </div>
                  </div>
                </div>

                {/* Mock Item 2 */}
                <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-start gap-3 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="mt-1 w-5 h-5 border-2 border-slate-300 rounded flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-[#1e3a8a]">SKU-023-2024</div>
                        <div className="font-medium text-slate-700">Connector XL</div>
                      </div>
                      <div className="bg-[#1e3a8a] text-white px-2 py-1 rounded text-xs font-bold">
                        Qty: 100
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Package size={12} className="text-slate-400"/> Location: Rack B-05
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white mt-auto">
              <button onClick={() => setActiveModalOrder(null)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleValidate} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm">
                <Package size={16} /> Validate & Ship
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDeliveryOrders;
