import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History, FileText } from 'lucide-react';

export default function Ledger() {
    const [ledger, setLedger] = useState([]);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/ledger');
                setLedger(data);
            } catch (error) {
                console.error("Ledger fetch error", error);
            }
        };
        fetchLedger();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <div className="bg-sky/20 p-2 rounded-lg text-navy">
                    <History size={24} />
                </div>
                <h1 className="text-2xl font-bold text-navy">Move History Ledger</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b">
                                <th className="p-4 font-medium">Date & Time</th>
                                <th className="p-4 font-medium">Operation</th>
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Location</th>
                                <th className="p-4 font-medium text-right">Change Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {ledger.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">
                                        {new Date(row.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span className="flex items-center space-x-2 text-gray-700 uppercase text-xs font-bold tracking-wider">
                                            <FileText size={14} className="text-gray-400" />
                                            <span>{row.doc_type || 'Initialization'}</span>
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{row.product_name}</td>
                                    <td className="p-4 text-gray-500">{row.warehouse_name || 'Virtual Location'}</td>
                                    <td className="p-4 text-right">
                                        <span className={parseFloat(row.change_amount) > 0 ? 'font-bold text-green-600' : 'font-bold text-red-600'}>
                                            {parseFloat(row.change_amount) > 0 ? '+' : ''}{row.change_amount}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {ledger.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No movement history found. Perform operations to populate the ledger.
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
