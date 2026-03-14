import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Plus, Trash2 } from 'lucide-react';

export default function Deliveries() {
    const navigate = useNavigate();
    const [sourceId, setSourceId] = useState('');
    const [items, setItems] = useState([{ product_id: '', quantity: 1 }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/operations', {
                doc_type: 'delivery',
                source_location_id: sourceId || 1, // Defaulting to 1 for MVP
                destination_location_id: null, // Customer (external)
                items
            });
            alert('Delivery order successfully processed!');
            navigate('/dashboard');
        } catch (error) {
            alert('Error processing delivery. Check constraints.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <ArrowUpRight size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-navy">New Delivery Order</h1>
                    <p className="text-coolgrey text-sm">Ship outgoing goods to customers from stock.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Warehouse ID</label>
                    <input 
                        type="number" 
                        required 
                        className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. 1 (Main Warehouse)"
                        value={sourceId}
                        onChange={(e) => setSourceId(e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-800">Items to Ship</h3>
                        <button 
                            type="button" 
                            onClick={() => setItems([...items, { product_id: '', quantity: 1 }])}
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
                            <div className="w-32">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                                <input 
                                    type="number" 
                                    required 
                                    min="1"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].quantity = Number(e.target.value);
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
                    <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition font-medium shadow-sm">
                        Validate Delivery
                    </button>
                </div>
            </form>
        </div>
    );
}
