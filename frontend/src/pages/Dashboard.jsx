import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, AlertCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // We're just fetching directly for now as this is an MVP
                const { data } = await axios.get('http://localhost:5000/api/dashboard/stats');
                setStats(data);
            } catch (error) {
                console.error("Dashboard fetch error", error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div className="flex h-full items-center justify-center">Loading...</div>;

    const kpis = [
        { title: 'Total Stock', value: stats.total_stock || 0, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Low Stock Items', value: stats.low_stock_count || 0, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
        { title: 'Pending Receipts', value: stats.pending_receipts || 0, icon: ArrowDownLeft, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Pending Deliveries', value: stats.pending_deliveries || 0, icon: ArrowUpRight, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-navy">Inventory Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className="bg-purewhite rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex items-center space-x-4 border border-gray-100">
                            <div className={kpi.bg + " p-3 rounded-lg"}>
                                <Icon className={"h-8 w-8 " + kpi.color} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-coolgrey tracking-wide uppercase">{kpi.title}</p>
                                <p className="text-2xl font-bold text-navy">{kpi.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="bg-purewhite rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                <h3 className="text-lg font-bold text-navy mb-4">Quick Actions</h3>
                <div className="flex space-x-4">
                    <button className="bg-navy text-purewhite px-5 py-2.5 rounded-lg hover:bg-[#152866] transition shadow-sm font-medium">Create Receipt</button>
                    <button className="bg-sky text-purewhite px-5 py-2.5 rounded-lg hover:bg-[#4A9CD0] transition shadow-sm font-medium">Create Delivery</button>
                </div>
            </div>
        </div>
    );
}
