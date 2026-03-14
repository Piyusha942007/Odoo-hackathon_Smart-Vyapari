import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                console.error("Products fetch error", error);
            }
        };
        fetchProducts();
    }, []);

    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-navy">Products List</h1>
                <button className="bg-navy text-purewhite px-5 py-2.5 rounded-lg hover:bg-[#152866] transition shadow-sm font-medium flex items-center">
                    <Plus size={20} className="mr-2" />
                    New Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search by name or SKU..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                                <th className="p-4 font-medium">SKU</th>
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">UOM</th>
                                <th className="p-4 font-medium">Current Stock</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {filtered.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-gray-700">{product.sku}</td>
                                    <td className="p-4 text-gray-900">{product.name}</td>
                                    <td className="p-4 text-gray-500">{product.uom}</td>
                                    <td className="p-4">
                                        <span className="font-semibold text-gray-800">{product.current_stock}</span>
                                    </td>
                                    <td className="p-4">
                                        {Number(product.current_stock) < product.low_stock_threshold ? (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium border border-red-200">
                                                Low Stock
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                                In Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
