import React from 'react';
import { ArrowLeftRight, Search, ChevronDown, CheckCircle, Plus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useWarehouse } from '../context/WarehouseContext';

const StaffInternalTransfers = () => {
  const { transfers, addTransfer, executeTransfer } = useWarehouse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    from: '',
    to: '',
    scheduled: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.quantity || !formData.from || !formData.to) return;

    addTransfer({
      product: formData.product,
      sku: 'SKU-NEW-2024', // Mock SKU lookup 
      quantity: parseInt(formData.quantity) || 0,
      from: formData.from,
      to: formData.to,
      scheduled: formData.scheduled,
      reason: formData.reason
    });

    setIsModalOpen(false);
    setFormData({ product: '', quantity: '', from: '', to: '', scheduled: '', reason: '' });
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
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Internal Transfers</h1>
            <p className="text-slate-500 text-sm mt-0.5">Move inventory between locations</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-colors"
        >
          <Plus size={18} /> New Transfer
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search transfers, products, or SKU..." 
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
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Transfer ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Product / SKU</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Quantity</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Movement</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Scheduled</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Status</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {transfer.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1e3a8a]">{transfer.product}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{transfer.sku}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {transfer.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                      <span>{transfer.from}</span>
                      <ArrowRight size={12} className="text-slate-400" />
                      <span>{transfer.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {transfer.scheduled}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-md text-xs font-bold ${getStatusStyle(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {transfer.status === 'Ready' && (
                        <button 
                          onClick={() => executeTransfer(transfer.id)}
                          className="flex items-center gap-1.5 bg-[#10b981] hover:bg-emerald-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors shadow-sm"
                        >
                          <CheckCircle size={14} /> Execute
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
      {/* Create Internal Transfer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1e3a8a]">Create Internal Transfer</h2>
                <p className="text-sm text-slate-500 mt-1">Move inventory from one location to another</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="transferForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Product / SKU</label>
                  <select name="product" required value={formData.product} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select product</option>
                    <option value="Widget Pro 500">Widget Pro 500</option>
                    <option value="Connector XL">Connector XL</option>
                    <option value="Assembly Kit">Assembly Kit</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Source Location</label>
                    <select name="from" required value={formData.from} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">From location</option>
                      <option value="Rack A-12">Rack A-12</option>
                      <option value="Rack B-05">Rack B-05</option>
                      <option value="Warehouse 2">Warehouse 2</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Destination Location</label>
                    <select name="to" required value={formData.to} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">To location</option>
                      <option value="Rack A-12">Rack A-12</option>
                      <option value="Rack B-05">Rack B-05</option>
                      <option value="Warehouse 2">Warehouse 2</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Quantity to Transfer</label>
                  <input type="number" name="quantity" required value={formData.quantity} onChange={handleInputChange} placeholder="Enter quantity" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Scheduled Date</label>
                  <input type="date" name="scheduled" required value={formData.scheduled} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Reason for Transfer</label>
                  <input type="text" name="reason" value={formData.reason} onChange={handleInputChange} placeholder="e.g., Restocking, Reorganization" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white mt-auto">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button form="transferForm" type="submit" className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
                Create Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffInternalTransfers;
