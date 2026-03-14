import React from 'react';

const ProductModal = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
        </div>
        
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Product Name</label>
            <input type="text" className="w-full mt-1 border border-slate-300 rounded-md p-2" placeholder="e.g. Widget Pro" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">SKU</label>
            <input type="text" className="w-full mt-1 border border-slate-300 rounded-md p-2" placeholder="SKU-XXX-2024" />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-md">Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;