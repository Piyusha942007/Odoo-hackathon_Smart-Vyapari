import { Search, Bell, UserCircle, Menu } from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function StaffNavbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Menu className="lg:hidden text-gray-500 cursor-pointer" />
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search SKU, product, or category..." 
            className="pl-10 h-10 bg-gray-50 border-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Select defaultValue="warehouse-1">
          <SelectTrigger className="w-[180px] h-9 border-none bg-gray-50">
            <SelectValue placeholder="Warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="warehouse-1">Warehouse 1 - Main</SelectItem>
            <SelectItem value="warehouse-2">Warehouse 2 - East</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative cursor-pointer text-gray-500 hover:text-[#1F3A93]">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </div>

        <div className="flex items-center gap-2 border-l pl-6 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[#1F3A93]">Staff User</p>
            <p className="text-xs text-gray-500">Warehouse Staff</p>
          </div>
          <UserCircle size={32} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}