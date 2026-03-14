import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ClipboardCheck, Package, MapPin } from "lucide-react";
import { toast } from "sonner";

export function StockCounting() {
  const handleAdjustment = () => {
    toast.success("Inventory Adjustment logged and stock updated!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#7F8C8D] p-3 rounded-lg text-white">
          <ClipboardCheck size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1F3A93]">Inventory Adjustment</h1>
          <p className="text-[#7F8C8D]">Match physical count with system records</p>
        </div>
      </div>

      <Card className="p-8 shadow-lg border-[#7F8C8D]/20 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-base">Product Name / SKU</Label>
            <Select>
              <SelectTrigger className="h-12"><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="steel">Steel Rods (SKU-101)</SelectItem>
                <SelectItem value="widget">Widget Pro 500 (SKU-001)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base">Storage Location</Label>
            <Select>
              <SelectTrigger className="h-12"><SelectValue placeholder="Select location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rack-a">Rack A-12</SelectItem>
                <SelectItem value="rack-b">Rack B-05</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-base">System Count (Recorded)</Label>
            <Input disabled value="150" className="h-12 bg-gray-50 font-bold" />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Physical Count (Actual)</Label>
            <Input type="number" placeholder="Enter counted quantity" className="h-12 border-[#1F3A93]/30" />
          </div>
        </div>

        <Button onClick={handleAdjustment} className="w-full h-14 bg-[#1F3A93] text-lg">
          Validate & Update Stock
        </Button>
      </Card>
    </div>
  );
}