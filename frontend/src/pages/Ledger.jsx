import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function StockLedger() {
    const { stockLedger } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredLedger = stockLedger
        .filter(entry => {
            const matchesSearch = entry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || entry.type.toLowerCase() === typeFilter.toLowerCase();
            return matchesSearch && matchesType;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const getTypeBadge = (type) => {
        const colors = {
            receipt: 'bg-[#2ECC71]',   // Green
            delivery: 'bg-[#3B82F6]',  // Blue
            transfer: 'bg-[#A855F7]',  // Purple
            adjustment: 'bg-[#FF8C00]', // Orange
        };

        return (
            <Badge className={`${colors[type.toLowerCase()] || 'bg-gray-500'} hover:${colors[type.toLowerCase()]} text-white border-none px-3 py-1 rounded-md capitalize font-normal`}>
                {type}
            </Badge>
        );
    };

    return (
        <div className="space-y-6 p-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-semibold text-[#1F3A93]">Stock Ledger</h1>
                <p className="text-[#7F8C8D]">Complete history of all stock movements</p>
            </div>

            {/* Search and Filters */}
            <Card className="shadow-sm border-none bg-white rounded-xl">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7F8C8D]" />
                            <Input
                                placeholder="Search by product or reference ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-[#f8f9fa] border-gray-200 h-11"
                            />
                        </div>
                        <div className="w-64">
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="bg-[#f8f9fa] border-gray-200 h-11 text-[#1F3A93]">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="receipt">Receipts</SelectItem>
                                    <SelectItem value="delivery">Deliveries</SelectItem>
                                    <SelectItem value="transfer">Transfers</SelectItem>
                                    <SelectItem value="adjustment">Adjustments</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Ledger Table */}
            <Card className="shadow-sm border-none bg-white rounded-xl overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b">
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6">Date</TableHead>
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6">Type</TableHead>
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6">Product</TableHead>
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6">Warehouse</TableHead>
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6">Quantity Change</TableHead>
                                <TableHead className="text-[#1F3A93] font-semibold py-4 px-6 text-right">Reference</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLedger.map((entry) => (
                                <TableRow key={entry.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <TableCell className="text-[#7F8C8D] px-6 py-4">{entry.date}</TableCell>
                                    <TableCell className="px-6 py-4">{getTypeBadge(entry.type)}</TableCell>
                                    <TableCell className="font-medium text-[#1F3A93] px-6 py-4">
                                        {entry.productName}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge variant="outline" className="border-[#5DADE2] text-[#5DADE2] font-normal px-2 py-1">
                                            {entry.warehouse}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-semibold">
                                            {entry.quantityChange > 0 ? (
                                                <>
                                                    <TrendingUp className="h-4 w-4 text-[#2ECC71]" />
                                                    <span className="text-[#2ECC71]">+{entry.quantityChange}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                                    <span className="text-red-500">{entry.quantityChange}</span>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-[#1F3A93] px-6 py-4 text-right">
                                        {entry.reference}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}