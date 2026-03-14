import React from 'react';
import { 
  History, Search, ChevronDown, Calendar, 
  ArrowRight, User, Package
} from 'lucide-react';

const StaffMoveHistory = () => {
  const movements = [
    {
      id: "MOV-2024-5678",
      type: "Internal Transfer",
      date: "2024-03-15 14:30",
      product: "Widget Pro 500",
      sku: "SKU-001-2024",
      quantity: 50,
      user: "Mike Johnson",
      from: "Rack A-12",
      to: "Rack B-15",
      reference: "TRF-2024-0421"
    },
    {
      id: "MOV-2024-5679",
      type: "Delivery",
      date: "2024-03-15 15:45",
      product: "Connector XL",
      sku: "SKU-023-2024",
      quantity: 100,
      user: "Jane Smith",
      from: "Rack B-05",
      to: "Delivered",
      reference: "DEL-2024-0289"
    },
    {
      id: "MOV-2024-5680",
      type: "Receipt",
      date: "2024-03-15 10:20",
      product: "Assembly Kit",
      sku: "SKU-045-2024",
      quantity: 200,
      user: "John Doe",
      from: "Received",
      to: "Rack C-08",
      reference: "RCP-2024-0156"
    },
    {
      id: "MOV-2024-5681",
      type: "Internal Transfer",
      date: "2024-03-14 16:10",
      product: "Mounting Bracket",
      sku: "SKU-078-2024",
      quantity: 75,
      user: "Sarah Wilson",
      from: "Rack D-15",
      to: "Rack A-05",
      reference: "TRF-2024-0420"
    }
  ];

  const getTypeStyle = (type) => {
    switch(type) {
      case 'Internal Transfer': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'Delivery': return 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200';
      case 'Receipt': return 'bg-blue-100 text-blue-700 border border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <History size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Move History</h1>
            <p className="text-slate-500 text-sm mt-0.5">Track all physical movements of inventory</p>
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
            placeholder="Search product, SKU, or reference..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="w-64 relative shrink-0">
          <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Movement Types</option>
            <option>Receipt</option>
            <option>Delivery</option>
            <option>Internal Transfer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Movement List */}
      <div className="space-y-4">
        {movements.map((move) => (
          <div key={move.id} className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-5 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Left Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${getTypeStyle(move.type)}`}>
                  {move.type}
                </span>
                <span className="text-sm font-bold text-[#1e3a8a]">{move.id}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar size={12} /> {move.date}
                </span>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-800 text-[15px]">{move.product}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{move.sku}</p>
              </div>

              <div className="flex gap-4 text-sm pt-1">
                <span className="text-slate-600 font-medium">
                  Quantity: <span className="text-[#1e3a8a] font-bold">{move.quantity}</span>
                </span>
                <span className="text-slate-600 flex items-center gap-1 font-medium">
                  Moved by: <span className="font-bold text-slate-800">{move.user}</span>
                </span>
              </div>
            </div>

            {/* Right Flow Diagram */}
            <div className="w-full md:w-auto shrink-0 flex flex-col items-center">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-2 self-start md:self-auto">Movement</span>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="bg-white border border-slate-200 rounded px-4 py-2 text-sm font-semibold text-slate-700 min-w-[100px] text-center shadow-sm">
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5">From</div>
                  {move.from}
                </div>
                <div className="text-slate-400">
                  <ArrowRight size={18} />
                </div>
                <div className="bg-white border border-slate-200 rounded px-4 py-2 text-sm font-semibold text-[#1e3a8a] min-w-[100px] text-center shadow-sm">
                  <div className="text-[10px] text-slate-400 font-medium mb-0.5">To</div>
                  {move.to}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Reference: <span className="font-semibold text-slate-600">{move.reference}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffMoveHistory;
