import React from 'react';
import { 
  BookOpen, Search, ChevronDown, Calendar, 
  TrendingUp, TrendingDown, Minus
} from 'lucide-react';

const StaffStockLedger = () => {
  const ledgerEntries = [
    {
      id: 1,
      date: "2024-03-15 10:30",
      product: "Widget Pro 500",
      sku: "SKU-001-2024",
      type: "Receipt",
      reference: "RCP-2024-0156",
      warehouse: "Warehouse 1 - Main",
      location: "Rack A-12",
      change: 50,
      balance: 150,
      user: "John Doe"
    },
    {
      id: 2,
      date: "2024-03-15 11:15",
      product: "Connector XL",
      sku: "SKU-023-2024",
      type: "Delivery",
      reference: "DEL-2024-0289",
      warehouse: "Warehouse 1 - Main",
      location: "Rack B-05",
      change: -100,
      balance: 50,
      user: "Jane Smith"
    },
    {
      id: 3,
      date: "2024-03-15 13:45",
      product: "Assembly Kit",
      sku: "SKU-045-2024",
      type: "Transfer",
      reference: "TRF-2024-0421",
      warehouse: "Warehouse 1 - Main",
      location: "Rack C-08 - Rack C-20",
      change: 0,
      balance: 185,
      user: "Mike Johnson"
    },
    {
      id: 4,
      date: "2024-03-15 14:20",
      product: "Mounting Bracket",
      sku: "SKU-078-2024",
      type: "Adjustment",
      reference: "ADJ-2024-0087",
      warehouse: "Warehouse 1 - Main",
      location: "Rack D-15",
      change: -15,
      balance: 285,
      user: "Sarah Wilson"
    },
    {
      id: 5,
      date: "2024-03-15 15:10",
      product: "Cable Set Premium",
      sku: "SKU-102-2024",
      type: "Receipt",
      reference: "RCP-2024-0157",
      warehouse: "Warehouse 2 - East",
      location: "Rack A-20",
      change: 200,
      balance: 212,
      user: "John Doe"
    }
  ];

  const getTypeStyle = (type) => {
    switch(type) {
      case 'Transfer': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'Adjustment': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Delivery': return 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200';
      case 'Receipt': return 'bg-blue-100 text-blue-700 border border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const getChangeDisplay = (change) => {
    if (change > 0) {
      return (
        <span className="flex items-center gap-1 text-emerald-600 font-bold">
          <TrendingUp size={14} /> +{change}
        </span>
      );
    } else if (change < 0) {
      return (
        <span className="flex items-center gap-1 text-red-600 font-bold">
          <TrendingDown size={14} /> {change}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-slate-400 font-bold">
        <Minus size={14} /> 0
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Stock Ledger</h1>
            <p className="text-slate-500 text-sm mt-0.5">Complete history of all inventory movements</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-[500px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search product, SKU, or reference..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="ml-auto flex gap-4">
          <div className="w-48 relative shrink-0">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Receipt</option>
              <option>Delivery</option>
              <option>Transfer</option>
              <option>Adjustment</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
          <div className="w-56 relative shrink-0">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Warehouses</option>
              <option>Warehouse 1 - Main</option>
              <option>Warehouse 2 - East</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e3a8a] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide w-[180px]">Date & Time</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Product / SKU</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Type</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Reference</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Warehouse</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Location</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Qty Change</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">Balance After</th>
                <th className="px-6 py-4 font-semibold text-[13px] tracking-wide">User</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className="font-medium">{entry.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1e3a8a]">{entry.product}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{entry.sku}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${getTypeStyle(entry.type)}`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    {entry.reference}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {entry.warehouse}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {entry.location}
                  </td>
                  <td className="px-6 py-4">
                    {getChangeDisplay(entry.change)}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#1e3a8a]">
                    {entry.balance}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium whitespace-nowrap">
                    {entry.user}
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

export default StaffStockLedger;
