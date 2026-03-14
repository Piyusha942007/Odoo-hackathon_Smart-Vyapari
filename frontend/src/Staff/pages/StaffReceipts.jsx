import React from 'react';
import { 
  Download, Search, Plus, Calendar, Package,
  CheckCircle2, ChevronDown
} from 'lucide-react';

import { useState } from 'react';
import { useWarehouse } from '../context/WarehouseContext';

const StaffReceipts = () => {
  const { receipts, addReceipt, validateReceipt } = useWarehouse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplier: '',
    expectedDate: '',
    destination: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.supplier || !formData.expectedDate) return;

    addReceipt({
      supplier: formData.supplier,
      expectedDate: formData.expectedDate,
      destination: formData.destination || 'Main Warehouse',
      items: Math.floor(Math.random() * 20) + 1, // Mock item count
      totalQty: Math.floor(Math.random() * 500) + 10, // Mock qty
      notes: formData.notes
    });

    setIsModalOpen(false);
    setFormData({ supplier: '', expectedDate: '', destination: '', notes: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Done': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Waiting': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Download size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Receipts</h1>
            <p className="text-slate-500 text-sm mt-0.5">Incoming goods from suppliers</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus size={18} /> New Receipt
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-[600px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search receipts or suppliers..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="ml-auto w-48 relative">
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
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Receipt ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Supplier</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Expected Date</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Items</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Total Qty</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Status</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, idx) => (
                <tr key={receipt.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 font-semibold text-[#1e3a8a]">
                      <Package size={16} className="text-[#4cb3ed]" />
                      {receipt.id}
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-700">
                    {receipt.supplier}
                  </td>
                  <td className="px-6 py-5 text-slate-500 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {receipt.expectedDate}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-700">
                    {receipt.items}
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-700">
                    {receipt.totalQty}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold border ${getStatusColor(receipt.status)}`}>
                      {receipt.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {receipt.status === 'Ready' && (
                        <button 
                          onClick={() => validateReceipt(receipt.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded border border-emerald-600 text-[13px] font-semibold transition-colors shadow-sm"
                        >
                          <CheckCircle2 size={14} /> Validate
                        </button>
                      )}
                      <button className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded border border-slate-300 text-[13px] font-semibold transition-colors shadow-sm">
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
      {/* Create Receipt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1e3a8a]">Create New Receipt</h2>
                <p className="text-sm text-slate-500 mt-1">Enter details for the incoming shipment</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="receiptForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Supplier</label>
                  <select name="supplier" required value={formData.supplier} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select supplier</option>
                    <option value="ABC Suppliers Inc.">ABC Suppliers Inc.</option>
                    <option value="XYZ Distribution">XYZ Distribution</option>
                    <option value="Global Parts Ltd.">Global Parts Ltd.</option>
                    <option value="Tech Components Co.">Tech Components Co.</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Expected Delivery Date</label>
                  <input type="date" name="expectedDate" required value={formData.expectedDate} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Destination Warehouse</label>
                  <select name="destination" value={formData.destination} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select warehouse</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="East Warehouse">East Warehouse</option>
                    <option value="West Warehouse">West Warehouse</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Additional information..." rows="3" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white mt-auto">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button form="receiptForm" type="submit" className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
                Create Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffReceipts;
