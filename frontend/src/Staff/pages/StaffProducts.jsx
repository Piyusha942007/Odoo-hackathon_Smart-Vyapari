import React, { useState } from 'react';
import { 
  Package, Search, Plus, Filter, Tag,
  MoreVertical, ChevronDown
} from 'lucide-react';

const StaffProducts = () => {
  const products = [
    {
      id: "SKU-001-2024",
      name: "Widget Pro 500",
      status: "In Stock",
      stock: 150,
      minStock: 20,
      category: "Electronics",
      price: "$29.99",
      locations: "Rack A-12, Rack B-03",
    },
    {
      id: "SKU-023-2024",
      name: "Connector XL",
      status: "Out of Stock",
      stock: 0,
      minStock: 15,
      category: "Hardware",
      price: "$12.50",
      locations: "Rack B-05",
    },
    {
      id: "SKU-045-2024",
      name: "Assembly Kit",
      status: "Low Stock",
      stock: 8,
      minStock: 25,
      category: "Tools",
      price: "$89.99",
      locations: "Rack C-08",
    },
    {
      id: "SKU-078-2024",
      name: "Mounting Bracket",
      status: "In Stock",
      stock: 285,
      minStock: 30,
      category: "Hardware",
      price: "$15.75",
      locations: "Rack D-15, Rack A-20",
    },
    {
      id: "SKU-102-2024",
      name: "Cable Set Premium",
      status: "Low Stock",
      stock: 12,
      minStock: 40,
      category: "Electronics",
      price: "$45.00",
      locations: "Rack A-20",
    }
  ];

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
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-md font-semibold text-sm transition-colors shadow-sm">
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
              <span className="text-slate-300">≡</span> {product.id}
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
          Price: <span className="font-bold text-slate-700">{product.price}</span>
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
