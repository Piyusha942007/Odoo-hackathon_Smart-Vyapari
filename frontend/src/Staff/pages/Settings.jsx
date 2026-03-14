import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Settings as SettingsIcon, Warehouse, MapPin, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const mockWarehouses = [
  { id: 1, name: "Warehouse 1 - Main", address: "123 Industrial Blvd, City, State 12345", active: true },
  { id: 2, name: "Warehouse 2 - East", address: "456 Commerce Dr, City, State 12346", active: true },
  { id: 3, name: "Warehouse 3 - West", address: "789 Logistics Way, City, State 12347", active: false },
];

const mockLocations = [
  { id: 1, warehouse: "Warehouse 1 - Main", name: "Rack A-12", type: "Rack", capacity: 500 },
  { id: 2, warehouse: "Warehouse 1 - Main", name: "Rack B-05", type: "Rack", capacity: 300 },
  { id: 3, warehouse: "Warehouse 1 - Main", name: "Rack C-08", type: "Rack", capacity: 450 },
  { id: 4, warehouse: "Warehouse 2 - East", name: "Rack A-01", type: "Rack", capacity: 600 },
];

const Settings = () => {
  const [warehouses] = useState(mockWarehouses);
  const [locations] = useState(mockLocations);

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-[1400px] p-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#5DADE2] p-3 rounded-lg">
          <SettingsIcon className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1F3A93]">Warehouse Settings</h1>
          <p className="text-[#7F8C8D] mt-1">Configure warehouses and storage locations</p>
        </div>
      </div>

      {/* Warehouses Section */}
      <Card className="shadow-lg border-[#7F8C8D]/20">
        <div className="p-6 border-b border-[#7F8C8D]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Warehouse className="text-[#5DADE2]" size={24} />
            <h2 className="text-xl font-bold text-[#1F3A93]">Warehouses</h2>
          </div>
          <Button className="bg-[#1F3A93] hover:bg-[#1F3A93]/90">
            <Plus className="mr-2" size={18} /> Add Warehouse
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id} className="p-4 border-2 border-[#7F8C8D]/20 flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-[#1F3A93]">{warehouse.name}</h3>
                <p className="text-[#7F8C8D] flex items-center gap-2"><MapPin size={16} />{warehouse.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label>Active</Label>
                  <Switch checked={warehouse.active} />
                </div>
                <Button variant="outline" size="icon"><Trash2 size={18} className="text-red-600" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Storage Locations Table */}
      <Card className="shadow-lg border-[#7F8C8D]/20 overflow-hidden">
        <div className="p-6 border-b border-[#7F8C8D]/20 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#1F3A93]">Storage Locations</h2>
            <Button className="bg-[#1F3A93] hover:bg-[#1F3A93]/90"><Plus size={18} className="mr-2"/> Add Location</Button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#1F3A93]">Location Name</th>
              <th className="px-6 py-4 text-left font-semibold text-[#1F3A93]">Warehouse</th>
              <th className="px-6 py-4 text-left font-semibold text-[#1F3A93]">Type</th>
              <th className="px-6 py-4 text-left font-semibold text-[#1F3A93]">Capacity</th>
              <th className="px-6 py-4 text-left font-semibold text-[#1F3A93]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {locations.map((loc) => (
              <tr key={loc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-[#1F3A93]">{loc.name}</td>
                <td className="px-6 py-4">{loc.warehouse}</td>
                <td className="px-6 py-4">{loc.type}</td>
                <td className="px-6 py-4">{loc.capacity} units</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm"><Trash2 size={16} className="text-red-600" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSaveSettings} className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white">
        Save Settings
      </Button>
    </div>
  );
};

export default Settings;