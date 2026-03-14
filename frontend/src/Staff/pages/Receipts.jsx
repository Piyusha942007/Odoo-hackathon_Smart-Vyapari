import React, { useState } from 'react';
import ReceiptModal from '../components/ReceiptModal';

const Receipts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const receiptData = [
    { id: 'RCP-2024-0156', supplier: 'ABC Suppliers Inc.', date: '2024-03-15', items: 15, qty: 450, status: 'Ready' },
    { id: 'RCP-2024-0157', supplier: 'XYZ Distribution', date: '2024-03-15', items: 8, qty: 280, status: 'Waiting' },
    { id: 'RCP-2024-0158', supplier: 'Global Parts Ltd.', date: '2024-03-16', items: 22, qty: 650, status: 'Draft' },
    { id: 'RCP-2024-0155', supplier: 'Tech Components Co.', date: '2024-03-14', items: 12, qty: 320, status: 'Done' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-sky-500 p-2 rounded-lg text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Receipts</h1>
            <p className="text-sm text-slate-500">Incoming goods from suppliers</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2b4291] hover:bg-[#1e2e66] text-white px-5 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors"
        >
          <span className="text-xl">+</span> New Receipt
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search receipts or suppliers..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none">
          <option>All Statuses</option>
          <option>Ready</option>
          <option>Waiting</option>
          <option>Done</option>
        </select>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2b4291] text-white">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm">Receipt ID</th>
              <th className="px-6 py-4 font-semibold text-sm">Supplier</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Expected Date</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Items</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Total Qty</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {receiptData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-blue-600 font-medium text-sm">📦 {row.id}</td>
                <td className="px-6 py-4 text-slate-700 font-medium text-sm">{row.supplier}</td>
                <td className="px-6 py-4 text-slate-500 text-sm text-center">📅 {row.date}</td>
                <td className="px-6 py-4 text-slate-700 text-sm text-center">{row.items}</td>
                <td className="px-6 py-4 text-slate-700 text-sm text-center font-semibold">{row.qty}</td>
                <td className="px-6 py-4 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {row.status === 'Ready' && (
                      <button className="bg-[#10b981] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#059669]">
                        Validate
                      </button>
                    )}
                    <button className="border border-slate-200 text-slate-600 px-3 py-1 rounded text-xs font-bold hover:bg-slate-100">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReceiptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Ready: 'bg-blue-50 text-blue-600 border-blue-100',
    Waiting: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    Draft: 'bg-slate-50 text-slate-500 border-slate-100',
    Done: 'bg-green-50 text-green-600 border-green-100',
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Receipts;