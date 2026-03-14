import React from 'react';
import { Plus, TrendingDown } from 'lucide-react';

export default function Adjustments() {
  const dummyData = [
    {
      id: "ADJ001",
      product: "Printer Ink Cartridge",
      warehouse: "Main Warehouse",
      systemQty: 10,
      countedQty: 8,
      difference: -2,
      reason: "Damaged items discarded",
      date: "2026-03-08"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F3A93]">Inventory Adjustments</h1>
          <p className="text-[#7F8C8D] text-sm mt-1">Record stock count discrepancies and adjustments</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1F3A93] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-900 transition-colors">
          <Plus className="w-[18px] h-[18px]" /> New Adjustment
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#e0e0e0] shadow-sm rounded-md overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#fcfbfc]">
              <tr>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Adjustment ID</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Product</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Warehouse</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">System Qty</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Counted Qty</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Difference</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Reason</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-[#1F3A93] border-b border-[#e0e0e0]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e0e0]">
              {dummyData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#1F3A93]">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-[#7F8C8D]">{item.product}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-[8px] py-[2px] rounded-md text-[13px] font-medium text-[#5DADE2] border border-[#5DADE2]">
                      {item.warehouse}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7F8C8D]">{item.systemQty}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1F3A93]">{item.countedQty}</td>
                  <td className="px-6 py-4 text-sm font-medium text-red-500">
                    <div className="flex items-center gap-1">
                      {item.difference < 0 && <TrendingDown className="w-4 h-4" />}
                      {item.difference}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7F8C8D]">{item.reason}</td>
                  <td className="px-6 py-4 text-sm text-[#7F8C8D]">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}