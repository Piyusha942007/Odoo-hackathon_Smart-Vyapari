import React from 'react';
import { 
  Download, Search, Plus, Calendar, Package,
  CheckCircle2, ChevronDown
} from 'lucide-react';

const StaffReceipts = () => {
  const receipts = [
    {
      id: "RCP-2024-0156",
      supplier: "ABC Suppliers Inc.",
      expectedDate: "2024-03-15",
      items: 15,
      totalQty: 450,
      status: "Ready",
      canValidate: true
    },
    {
      id: "RCP-2024-0157",
      supplier: "XYZ Distribution",
      expectedDate: "2024-03-15",
      items: 8,
      totalQty: 280,
      status: "Waiting",
      canValidate: false
    },
    {
      id: "RCP-2024-0158",
      supplier: "Global Parts Ltd.",
      expectedDate: "2024-03-16",
      items: 22,
      totalQty: 650,
      status: "Draft",
      canValidate: false
    },
    {
      id: "RCP-2024-0155",
      supplier: "Tech Components Co.",
      expectedDate: "2024-03-14",
      items: 12,
      totalQty: 320,
      status: "Done",
      canValidate: false
    }
  ];

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
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
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
                      {receipt.canValidate && (
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded border border-emerald-600 text-[13px] font-semibold transition-colors shadow-sm">
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
    </div>
  );
};

export default StaffReceipts;
