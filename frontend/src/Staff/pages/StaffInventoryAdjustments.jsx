import React from 'react';
import { ClipboardList, Search, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useWarehouse } from '../context/WarehouseContext';

const StaffInventoryAdjustments = () => {
  const { adjustments, addAdjustment } = useWarehouse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    location: '',
    recorded: '',
    physical: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.physical || !formData.recorded) return;

    const recordedVal = parseInt(formData.recorded);
    const physicalVal = parseInt(formData.physical);
    
    addAdjustment({
      product: formData.product,
      sku: 'SKU-NEW-2024',
      location: formData.location || 'Unknown',
      recorded: recordedVal,
      physical: physicalVal,
      difference: physicalVal - recordedVal,
      reason: formData.reason,
      adjustedBy: 'Current User', // Mock user
      date: new Date().toISOString().split('T')[0]
    });

    setIsModalOpen(false);
    setFormData({ product: '', location: '', recorded: '', physical: '', reason: '' });
  };

  const getDifferenceStyle = (diff) => {
    if (diff > 0) {
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
    if (diff < 0) {
      return "bg-red-100 text-red-700 border-red-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <ClipboardList size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Inventory Adjustments</h1>
            <p className="text-slate-500 text-sm mt-0.5">Reconcile physical counts with system records</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-colors"
        >
          <Plus size={18} /> New Adjustment
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
            placeholder="Search adjustments, products, or SKU..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e3a8a] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Adjustment ID</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Product / SKU</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Location</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Recorded</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide text-center">Physical</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide text-center">Difference</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Reason</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Adjusted By</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Date</th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((adj) => (
                <tr key={adj.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 hover:shadow-sm">
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {adj.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1e3a8a]">{adj.product}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{adj.sku}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {adj.location}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {adj.recorded}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a] text-center">
                    {adj.physical}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-bold border ${getDifferenceStyle(adj.difference)}`}>
                      {adj.difference > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {adj.difference > 0 ? `+${adj.difference}` : adj.difference}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {adj.reason}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {adj.adjustedBy}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {adj.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Create Adjustment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1e3a8a]">New Inventory Adjustment</h2>
                <p className="text-sm text-slate-500 mt-1">Reconcile physical counts with system records</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="adjustmentForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Product / SKU</label>
                  <select name="product" required value={formData.product} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select product</option>
                    <option value="Widget Pro 500">Widget Pro 500</option>
                    <option value="Connector XL">Connector XL</option>
                    <option value="Assembly Kit">Assembly Kit</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Location</label>
                  <select name="location" required value={formData.location} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select location</option>
                    <option value="Rack A-12">Rack A-12</option>
                    <option value="Rack B-05">Rack B-05</option>
                    <option value="Rack C-08">Rack C-08</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Recorded Quantity (System)</label>
                    <input type="number" name="recorded" required value={formData.recorded} onChange={handleInputChange} placeholder="0" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Physical Quantity (Actual)</label>
                    <input type="number" name="physical" required value={formData.physical} onChange={handleInputChange} placeholder="0" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Reason for Adjustment</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} placeholder="e.g., Physical count discrepancy, damage..." rows="2" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white mt-auto">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button form="adjustmentForm" type="submit" className="px-5 py-2.5 bg-[#1e3a8a] text-white rounded-md font-semibold text-sm hover:bg-blue-900 shadow-sm transition-colors">
                Confirm Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffInventoryAdjustments;
