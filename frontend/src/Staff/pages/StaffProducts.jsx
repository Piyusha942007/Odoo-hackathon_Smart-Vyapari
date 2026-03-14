import React, { useState } from 'react';
import { 
  Package, Search, Plus, Filter, Tag,
  MoreVertical, ChevronDown
} from 'lucide-react';

import { useWarehouse } from '../context/WarehouseContext';

const StaffProducts = () => {
  const { products, addProduct } = useWarehouse();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    barcode: '',
    name: '',
    description: '',
    category: '',
    unit: '',
    price: '',
    minStock: '',
    reorderQty: '',
    supplier: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return; // Simple validation
    
    addProduct({
      name: formData.name,
      sku: formData.sku,
      category: formData.category || 'Uncategorized',
      price: parseFloat(formData.price) || 0,
      stock: 0, // Initial stock is 0
      minStock: parseInt(formData.minStock) || 0,
      supplier: formData.supplier || 'Unknown',
      locations: 'Unassigned',
      status: 'Out of Stock' // Default status for new items with 0 stock
    });
    
    setIsModalOpen(false);
    setFormData({
      sku: '', barcode: '', name: '', description: '', category: '', 
      unit: '', price: '', minStock: '', reorderQty: '', supplier: '', notes: ''
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#4cb3ed] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[#1e3a8a] leading-tight">Products</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage your product catalog</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm"
        >
          <Plus size={18} /> New Product
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-[500px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search products or SKU..." 
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        
        <div className="relative w-64">
          <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Hardware</option>
            <option>Tools</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="relative w-64">
          <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => {
          // Calculate status dynamically if context provides numbers
          let status = product.stock === 0 ? 'Out of Stock' : (product.stock <= product.minStock ? 'Low Stock' : 'In Stock');
          // Support existing mock data status property if present
          if (product.status && !product.stock) status = product.status;
          
          return <ProductCard key={product.id} product={{...product, status}} />;
        })}
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-[#1e3a8a]">Create New Product</h2>
                <p className="text-sm text-slate-500 mt-1">Add a new product to your inventory</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">SKU</label>
                    <input type="text" name="sku" required value={formData.sku} onChange={handleInputChange} placeholder="e.g., SKU-001-2024" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm text-[#1e3a8a] font-bold">Barcode (Optional)</label>
                    <input type="text" name="barcode" value={formData.barcode} onChange={handleInputChange} placeholder="e.g., 1234567890123" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter product name" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Description (Optional)</label>
                  <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Brief description" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Unit of Measure</label>
                    <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select unit</option>
                      <option value="Pieces">Pieces</option>
                      <option value="Boxes">Boxes</option>
                      <option value="Pallets">Pallets</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Unit Price ($)</label>
                    <input type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} placeholder="0.00" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Min Stock Level</label>
                    <input type="number" name="minStock" value={formData.minStock} onChange={handleInputChange} placeholder="20" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-[#1e3a8a]">Reorder Quantity</label>
                    <input type="number" name="reorderQty" value={formData.reorderQty} onChange={handleInputChange} placeholder="100" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Preferred Supplier (Optional)</label>
                  <select name="supplier" value={formData.supplier} onChange={handleInputChange} className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select supplier</option>
                    <option value="ABC Suppliers Inc.">ABC Suppliers Inc.</option>
                    <option value="Global Parts Ltd.">Global Parts Ltd.</option>
                    <option value="Tech Components Co.">Tech Components Co.</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-[#1e3a8a]">Notes (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Additional information..." rows="2" className="w-full bg-[#f8fafc] border border-slate-200 text-slate-800 text-sm py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white mt-auto">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md font-semibold text-sm hover:bg-slate-50">
                Cancel
              </button>
              <button form="productForm" type="submit" className="px-4 py-2 bg-[#1e3a8a] text-white rounded-md font-semibold text-sm hover:bg-blue-900 shadow-sm">
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Out of Stock': return 'bg-red-100 text-red-700 border-red-200';
      case 'Low Stock': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 border border-slate-100 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ebf5ff] flex items-center justify-center text-[#4cb3ed] shrink-0">
            <Package size={20} />
          </div>
          <div>
            <h3 className="font-bold text-[#1e3a8a] text-[15px]">{product.name}</h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-slate-300">≡</span> {product.sku}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusStyle(product.status)}`}>
          {product.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-5 mb-5">
        <div>
          <div className="text-[11px] text-slate-400 mb-1 font-medium">Total Stock</div>
          <div className={`text-[28px] font-bold leading-none ${product.stock === 0 ? 'text-red-500' : 'text-[#1e3a8a]'}`}>
            {product.stock}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400 mb-1 font-medium">Min Stock</div>
          <div className="text-[28px] font-medium leading-none text-slate-600">
            {product.minStock}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6 flex-1">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Tag size={14} className="text-slate-400" /> {product.category}
        </div>
        <div className="text-sm text-slate-500">
          Price: <span className="font-bold text-slate-700">{typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price}</span>
        </div>
        <div className="text-sm text-slate-500 truncate">
          Locations: <span className="text-slate-700">{product.locations}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button className="py-2.5 bg-[#4cb3ed] hover:bg-sky-500 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
          View Details
        </button>
        <button className="py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md font-semibold text-sm transition-colors shadow-sm">
          Edit
        </button>
      </div>
    </div>
  );
};

export default StaffProducts;
