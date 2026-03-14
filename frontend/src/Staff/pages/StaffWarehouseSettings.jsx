import React from 'react';
import { Settings, Plus, MapPin, Building2, Trash2, Edit2, ChevronDown } from 'lucide-react';

const StaffWarehouseSettings = () => {
  return (
    <div className="mx-auto space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Warehouse Settings</h1>
            <p className="text-slate-500 text-sm mt-0.5">Configure warehouses and storage locations</p>
          </div>
        </div>
      </div>

      {/* Warehouses Section */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-[#1e3a8a] flex items-center gap-2">
            <Building2 size={20} className="text-[#4cb3ed]" /> Warehouses
          </h2>
          <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2 rounded-md font-semibold text-xs shadow-sm transition-colors">
            <Plus size={16} /> Add Warehouse
          </button>
        </div>

        <div className="space-y-4">
          {/* Warehouse Card 1 */}
          <div className="border border-slate-200 rounded-lg p-5 flex items-center justify-between hover:border-blue-300 transition-colors">
            <div>
              <h3 className="font-bold text-[#1e3a8a] text-[15px]">Warehouse 1 - Main</h3>
              <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> 123 Industrial Blvd, City, State 12345
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Active</span>
                <div className="w-9 h-5 bg-[#1e3a8a] rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-md border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Warehouse Card 2 */}
          <div className="border border-slate-200 rounded-lg p-5 flex items-center justify-between hover:border-blue-300 transition-colors">
            <div>
              <h3 className="font-bold text-[#1e3a8a] text-[15px]">Warehouse 2 - East</h3>
              <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> 456 Commerce Dr, City, State 12345
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Active</span>
                <div className="w-9 h-5 bg-[#1e3a8a] rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-md border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Warehouse Card 3 */}
          <div className="border border-slate-200 rounded-lg p-5 flex items-center justify-between hover:border-blue-300 transition-colors bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-700 text-[15px]">Warehouse 3 - West</h3>
              <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> 789 Logistics Way, City, State 12347
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Active</span>
                <div className="w-9 h-5 bg-slate-200 rounded-full relative cursor-pointer border border-slate-300">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-md border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Locations */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-6 pb-4">
          <h2 className="text-lg font-bold text-[#1e3a8a] flex items-center gap-2">
            <MapPin size={20} className="text-[#4cb3ed]" /> Storage Locations
          </h2>
          <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-blue-900 text-white px-4 py-2 rounded-md font-semibold text-xs shadow-sm transition-colors">
            <Plus size={16} /> Add Location
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-[#1e3a8a] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold text-[13px] tracking-wide">Location Name</th>
                <th className="px-6 py-4 font-bold text-[13px] tracking-wide">Warehouse</th>
                <th className="px-6 py-4 font-bold text-[13px] tracking-wide">Type</th>
                <th className="px-6 py-4 font-bold text-[13px] tracking-wide">Capacity</th>
                <th className="px-6 py-4 font-bold text-[13px] tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">Rack A-12</td>
                <td className="px-6 py-4 text-slate-600">Warehouse 1 - Main</td>
                <td className="px-6 py-4 text-slate-600">Rack</td>
                <td className="px-6 py-4 text-slate-600">500 units</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100"><Edit2 size={14} /></button>
                    <button className="w-8 h-8 rounded border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">Rack B-05</td>
                <td className="px-6 py-4 text-slate-600">Warehouse 1 - Main</td>
                <td className="px-6 py-4 text-slate-600">Rack</td>
                <td className="px-6 py-4 text-slate-600">300 units</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100"><Edit2 size={14} /></button>
                    <button className="w-8 h-8 rounded border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">Rack C-08</td>
                <td className="px-6 py-4 text-slate-600">Warehouse 1 - Main</td>
                <td className="px-6 py-4 text-slate-600">Rack</td>
                <td className="px-6 py-4 text-slate-600">450 units</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100"><Edit2 size={14} /></button>
                    <button className="w-8 h-8 rounded border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">Rack A-01</td>
                <td className="px-6 py-4 text-slate-600">Warehouse 2 - East</td>
                <td className="px-6 py-4 text-slate-600">Rack</td>
                <td className="px-6 py-4 text-slate-600">600 units</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100"><Edit2 size={14} /></button>
                    <button className="w-8 h-8 rounded border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 p-6 space-y-6">
        <h2 className="text-lg font-bold text-[#1e3a8a] border-b border-slate-100 pb-4">General Settings</h2>
        
        <div className="space-y-5 max-w-xl">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#1e3a8a]">Default Warehouse</label>
            <div className="relative w-80">
              <select className="w-full appearance-none bg-[#f8fafc] border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Warehouse 1 - Main</option>
                <option>Warehouse 2 - East</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-[#1e3a8a]">Low Stock Alert Threshold (%)</label>
            <input 
              type="text" 
              defaultValue="20"
              className="w-80 bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400">Alert when stock falls below this percentage of minimum stock level</p>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-5">
            <div>
              <h4 className="font-bold text-[#1e3a8a] text-sm">Enable Auto-Reorder Suggestions</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Automatically suggest reorders when stock is low</p>
            </div>
            <div className="w-9 h-5 bg-[#1e3a8a] rounded-full relative cursor-pointer shadow-inner">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-[#1e3a8a] text-sm">Enable Barcode Scanning</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Allow mobile devices to scan barcodes for quick operations</p>
            </div>
            <div className="w-9 h-5 bg-[#1e3a8a] rounded-full relative cursor-pointer shadow-inner">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="pt-4">
            <button className="bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-sm px-6 py-2.5 rounded-md shadow-sm transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StaffWarehouseSettings;
