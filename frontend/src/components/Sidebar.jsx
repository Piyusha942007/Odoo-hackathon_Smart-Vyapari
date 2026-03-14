import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowDownLeft, ArrowUpRight, Repeat, Settings2, History } from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Receipts', path: '/operations/receipts', icon: ArrowDownLeft },
    { name: 'Deliveries', path: '/operations/deliveries', icon: ArrowUpRight },
    { name: 'Internal Transfers', path: '/operations/transfers', icon: Repeat },
    { name: 'Adjustments', path: '/operations/adjustments', icon: Settings2 },
    { name: 'Move History', path: '/ledger', icon: History },
];

export default function Sidebar() {
    return (
        <aside className="w-64 bg-navy text-purewhite flex flex-col h-full shadow-lg">
            <div className="p-6 flex items-center space-x-3 border-b border-white/10">
                <Package className="h-8 w-8 text-sky" />
                <span className="text-xl font-bold tracking-wide text-purewhite">Smart Vyapari</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors " +
                                (isActive
                                    ? "bg-sky text-purewhite shadow-md font-semibold"
                                    : "text-coolgrey hover:bg-white/10 hover:text-purewhite")
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}