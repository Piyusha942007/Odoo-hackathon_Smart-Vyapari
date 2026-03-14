import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AlertTriangle,
  ArrowDownToLine,
  Truck,
  ArrowLeftRight,
  Package,
  TrendingDown,
  Clock
} from "lucide-react";

const kpiData = [
  { icon: ArrowDownToLine, label: "Pending Receipts", value: "12", color: "bg-[#5DADE2]", textColor: "text-[#5DADE2]" },
  { icon: Truck, label: "Pending Deliveries", value: "8", color: "bg-[#5DADE2]", textColor: "text-[#5DADE2]" },
  { icon: ArrowLeftRight, label: "Internal Transfers", value: "5", color: "bg-[#5DADE2]", textColor: "text-[#5DADE2]" },
  { icon: Package, label: "Total Products", value: "1,248", color: "bg-[#1F3A93]", textColor: "text-[#1F3A93]" },
];

const lowStockItems = [
  { sku: "SKU-001-2024", name: "Widget Pro 500", current: 5, min: 20, location: "Rack A-12", status: "Low Stock" },
  { sku: "SKU-023-2024", name: "Connector XL", current: 0, min: 15, location: "Rack B-05", status: "Out of Stock" },
  { sku: "SKU-045-2024", name: "Assembly Kit", current: 8, min: 25, location: "Rack C-08", status: "Low Stock" },
];

const recentActivity = [
  { type: "Receipt", doc: "RCP-2024-0156", status: "Ready", time: "10 mins ago" },
  { type: "Delivery", doc: "DEL-2024-0289", status: "Done", time: "25 mins ago" },
  { type: "Transfer", doc: "TRF-2024-0421", status: "Waiting", time: "1 hour ago" },
];

export function StaffDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1F3A93]">Warehouse Dashboard</h1>
          <p className="text-[#7F8C8D] font-medium">Monitor operations and stock levels</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="warehouse-1">
            <SelectTrigger className="w-[200px] h-11 bg-white border-[#7F8C8D]/30 shadow-sm font-bold text-[#1F3A93]">
              <SelectValue placeholder="Select Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warehouse-1">Warehouse 1 - Main</SelectItem>
              <SelectItem value="warehouse-2">Warehouse 2 - East</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="p-6 border-none shadow-md hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-[#7F8C8D] uppercase tracking-wider">{kpi.label}</p>
                  <p className={`text-4xl font-black ${kpi.textColor} mt-1`}>{kpi.value}</p>
                </div>
                <div className={`${kpi.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Low Stock Alerts */}
      <Card className="shadow-lg border-none overflow-hidden">
        <div className="p-6 bg-red-50 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={28} />
            <div>
              <h2 className="text-xl font-black text-[#1F3A93]">Low Stock Alerts</h2>
              <p className="text-sm text-red-600 font-bold uppercase tracking-widest">Action Required</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-[#1F3A93] text-xs uppercase font-black">
              <tr>
                <th className="px-6 py-4 text-left">SKU</th>
                <th className="px-6 py-4 text-left">Product Name</th>
                <th className="px-6 py-4 text-center">Current</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {lowStockItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-sm text-[#1F3A93]">{item.sku}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-lg font-black ${item.current === 0 ? "text-red-600" : "text-orange-500"}`}>
                      {item.current}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-500">{item.location}</td>
                  <td className="px-6 py-4 text-right">
                    <Badge className={item.current === 0 ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom Section: Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="shadow-lg border-none">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <Clock className="text-[#1F3A93]" size={20} />
            <h2 className="text-xl font-black text-[#1F3A93]">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((act, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="space-y-1">
                  <p className="font-black text-[#1F3A93]">{act.type}</p>
                  <p className="text-xs font-bold text-[#7F8C8D] font-mono">{act.doc}</p>
                </div>
                <div className="text-right">
                   <Badge variant="outline" className="border-[#5DADE2] text-[#1F3A93] font-bold">{act.status}</Badge>
                   <p className="text-[10px] text-[#7F8C8D] mt-1 font-bold uppercase">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg border-none">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-black text-[#1F3A93]">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <Button className="w-full h-14 bg-[#1F3A93] hover:bg-[#1F3A93]/90 text-lg font-black shadow-lg shadow-blue-900/20">
              <ArrowDownToLine className="mr-3" /> New Receipt
            </Button>
            <Button className="w-full h-14 bg-[#5DADE2] hover:bg-[#5DADE2]/90 text-lg font-black shadow-lg shadow-blue-400/20 text-white">
              <Truck className="mr-3" /> New Delivery Order
            </Button>
            <Button className="w-full h-14 bg-[#1F3A93] hover:bg-[#1F3A93]/90 text-lg font-black">
              <ArrowLeftRight className="mr-3" /> Internal Transfer
            </Button>
            <Button variant="outline" className="w-full h-14 border-2 border-slate-200 text-slate-500 font-black text-lg hover:bg-slate-50">
              <Package className="mr-3" /> Inventory Adjustment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}