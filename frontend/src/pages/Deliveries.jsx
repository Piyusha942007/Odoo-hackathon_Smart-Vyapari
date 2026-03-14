import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { Plus, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function DeliveryOrders() {
    const { deliveryOrders, addDeliveryOrder, products } = useApp();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [customer, setCustomer] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleAddProductToOrder = () => {
        if (selectedProduct && quantity > 0) {
            const product = products.find(p => p.id === selectedProduct);
            if (product) {
                setSelectedProducts([...selectedProducts, {
                    productId: product.id,
                    productName: product.name,
                    quantity,
                }]);
                setSelectedProduct('');
                setQuantity(0);
            }
        }
    };

    const handleCreateOrder = (status) => {
        if (customer && selectedProducts.length > 0) {
            const newOrder = {
                id: `DO00${deliveryOrders.length + 1}`,
                customer,
                products: selectedProducts,
                status,
                date: new Date().toISOString().split('T')[0],
            };
            addDeliveryOrder(newOrder);
            setDialogOpen(false);
            setCustomer('');
            setSelectedProducts([]);
        }
    };

    const getStatusBadge = (status) => {
        const colors = {
            Draft: 'bg-gray-500',
            Waiting: 'bg-[#FF8C00]',
            Ready: 'bg-[#3B82F6]',
            Done: 'bg-[#00C853]',
            Canceled: 'bg-red-500',
        };
        return (
            <Badge className={`${colors[status]} hover:${colors[status]} text-white border-none px-2 py-0.5 rounded text-xs font-normal`}>
                {status}
            </Badge>
        );
    };

    return (
        <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-[#1F3A93]">Delivery Orders</h1>
                    <p className="text-[#7F8C8D]">Manage outgoing deliveries</p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="bg-[#1F3A93] hover:bg-[#2c4fa8]">
                    <Plus className="h-4 w-4 mr-2" />
                    New Delivery Order
                </Button>
            </div>

            {/* Delivery Orders Table */}
            <Card className="shadow-sm border-none">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-[#1F3A93] font-medium py-4">Order ID</TableHead>
                                <TableHead className="text-[#1F3A93] font-medium py-4">Customer</TableHead>
                                <TableHead className="text-[#1F3A93] font-medium py-4">Products</TableHead>
                                <TableHead className="text-[#1F3A93] font-medium py-4">Total Quantity</TableHead>
                                <TableHead className="text-[#1F3A93] font-medium py-4">Date</TableHead>
                                <TableHead className="text-[#1F3A93] font-medium py-4">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deliveryOrders.map((order) => {
                                const totalQty = order.products.reduce((sum, p) => sum + p.quantity, 0);
                                return (
                                    <TableRow key={order.id} className="border-b last:border-0">
                                        <TableCell className="font-medium text-[#1F3A93]">{order.id}</TableCell>
                                        <TableCell className="text-[#1F3A93]">{order.customer}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                {order.products.map((p, idx) => (
                                                    <div key={idx} className="text-sm text-[#7F8C8D]">
                                                        {p.productName} <span className="text-[#1F3A93] font-medium">({p.quantity})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold text-[#1F3A93]">{totalQty}</TableCell>
                                        <TableCell className="text-[#7F8C8D]">{order.date}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Delivery Order Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-lg">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-[#1F3A93] text-xl font-semibold">Create Delivery Order</DialogTitle>
                        <DialogDescription className="text-[#7F8C8D] mt-1">
                            Add customer information and products to deliver
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="customer" className="text-[#1F3A93] font-medium">Customer Name</Label>
                            <Input
                                id="customer"
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                                placeholder="Enter customer name"
                                className="border-2 border-[#A0C4FF] focus-visible:ring-0 focus-visible:border-[#1F3A93] h-11"
                            />
                        </div>

                        <hr className="border-gray-100" />

                        <div className="space-y-4">
                            <h3 className="text-[#1F3A93] font-semibold text-lg">Add Products</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-3 space-y-2">
                                    <Label htmlFor="product" className="text-[#1F3A93]">Product</Label>
                                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                                        <SelectTrigger className="bg-[#f8f9fa] border-gray-200 h-10">
                                            <SelectValue placeholder="Select product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity" className="text-[#1F3A93]">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                                        className="bg-[#f8f9fa] border-gray-200 h-10"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleAddProductToOrder}
                                className="bg-[#5DB9E2] hover:bg-[#4ea9d1] text-white px-4 py-2 h-auto"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Product
                            </Button>
                        </div>

                        {selectedProducts.length > 0 && (
                            <div className="border rounded-md overflow-hidden">
                                <Table>
                                    <TableBody>
                                        {selectedProducts.map((p, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="py-2">{p.productName}</TableCell>
                                                <TableCell className="py-2 text-right">{p.quantity}</TableCell>
                                                <TableCell className="py-2 w-10">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setSelectedProducts(selectedProducts.filter((_, i) => i !== idx))}
                                                        className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="p-6 pt-0 flex justify-between sm:justify-between items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                            className="px-8 border-gray-300 text-gray-600 font-medium"
                        >
                            Cancel
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => handleCreateOrder('Waiting')}
                                className="bg-[#FF6D00] hover:bg-[#e66200] text-white font-medium"
                            >
                                Save as Waiting
                            </Button>
                            <Button
                                onClick={() => handleCreateOrder('Done')}
                                className="bg-[#00C853] hover:bg-[#00b24a] text-white font-medium"
                            >
                                <Check className="h-4 w-4 mr-2" />
                                Deliver & Update Stock
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}