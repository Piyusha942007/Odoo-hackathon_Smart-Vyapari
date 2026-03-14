import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ClipboardCheck, Package } from "lucide-react";

export function StockCounting() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <div className="bg-[#1F3A93] p-4 rounded-2xl shadow-lg">
          <ClipboardCheck className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#1F3A93]">Inventory Adjustment [cite: 34]</h1>
          <p className="text-slate-500">Fix mismatches between recorded and physical stock [cite: 75, 76]</p>
        </div>
      </div>

      <Card className="odoo-card p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-600 uppercase">Select Product [cite: 80]</label>
            <Input className="h-12 border-slate-200" placeholder="SKU or Name..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-600 uppercase">Counted Quantity [cite: 81]</label>
            <Input type="number" className="h-12 border-[#1F3A93]/30 text-lg font-bold" />
          </div>
        </div>
        <Button className="btn-primary w-full h-16 text-xl">Validate & Update Ledger [cite: 82]</Button>
      </Card>
    </div>
  );
}