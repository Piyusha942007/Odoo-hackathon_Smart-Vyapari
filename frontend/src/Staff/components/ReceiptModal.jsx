import React from 'react';

const ReceiptModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="p-6 pb-0 relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 text-xl"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-[#2b4291]">Create New Receipt</h2>
          <p className="text-xs text-slate-500 mt-1">Enter details for the incoming shipment</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Supplier</label>
            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Select supplier</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Expected Delivery Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Destination Warehouse</label>
            <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Select warehouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Notes</label>
            <textarea 
              rows="3"
              placeholder="Additional information..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-2.5 bg-[#2b4291] text-white rounded-lg font-bold hover:bg-[#1e2e66] transition-colors"
          >
            Create Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;