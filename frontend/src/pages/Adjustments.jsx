import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Settings2, Plus, Trash2 } from 'lucide-react';

export default function Adjustments() {
    const navigate = useNavigate();
    const [warehouseId, setWarehouseId] = useState('');
    const [items, setItems] = useState([{ product_id: '', real_quantity: 0 }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Because our current MVP API takes "quantity" to map to +/-,
            // For adjustments, users enter exactly what the *difference* is right now
            // Future feature: user enters actual count, system queries current stock, calculates diff.
            // For this version we will map real_quantity to the change amount directly.
            
            const adjustments = items.map(i => ({ product_id: i.product_id, quantity: i.real_quantity }));

            await axios.post('http://localhost:5000/api/operations', {
                doc_type: 'adjustment',
                source_location_id: warehouseId, // Using source ID as the place being adjusted
                destination_location_id: null,
                items: adjustments
            });
            alert('Adjustment successfully logged!');
            navigate('/dashboard');
        } catch (error) {
            alert('Error creating adjustment.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Settings2 size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-navy">Stock Adjustments</h1>
                    <p className="text-coolgrey text-sm">Update ledger to reflect physical counts (Use negative numbers for lost/damaged stock).</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Warehouse ID</label>
                    <input 
                        type="number" 
                        required 
                        className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 1"
                        value={warehouseId}
                        onChange={(e) => setWarehouseId(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-800">Adjusted Products</h3>
                        <button 
                            type="button" 
                            onClick={() => setItems([...items, { product_id: '', real_quantity: 0 }])}
                            className="text-sm flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <Plus size={16} className="mr-1" /> Add Line
                        </button>
                    </div>

                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-end space-x-4">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Product ID</label>
                                <input 
                                    type="number" 
                                    required 
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Product ID"
                                    value={item.product_id}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].product_id = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            </div>
                            <div className="w-48">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Difference Quantiy (+/-)</label>
                                <input 
                                    type="number" 
                                    required 
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={item.real_quantity}
                                    placeholder="-3 or +5"
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].real_quantity = Number(e.target.value);
                                        setItems(newItems);
                                    }}
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={() => setItems(items.filter((_, i) => i !== idx))}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium shadow-sm">
                        Log Adjustment
                    </button>
                </div>
            </form>
        </div>
    );
}
