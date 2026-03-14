import { useState } from 'react';
import { useApp } from '../context/store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
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

export default function Receipts() {
  const { receipts, addReceipt, products } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [supplier, setSupplier] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProductToReceipt = () => {
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

  const handleCreateReceipt = (status) => {
    if (supplier && selectedProducts.length > 0) {
      const newReceipt = {
        id: `REC${Date.now()}`,
        supplier,
        products: selectedProducts,
        status,
        date: new Date().toISOString().split('T')[0],
      };
      addReceipt(newReceipt);
      setDialogOpen(false);
      setSupplier('');
      setSelectedProducts([]);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      Draft: 'bg-gray-500',
      Waiting: 'bg-orange-500',
      Ready: 'bg-blue-500',
      Done: 'bg-green-500',
      Canceled: 'bg-red-500',
    };
    return <Badge className={`${colors[status]} hover:${colors[status]}`}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-[#1F3A93]">Receipts</h1>
          <p className="text-[#7F8C8D]">Manage incoming stock receipts</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-[#1F3A93] hover:bg-[#2c4fa8]">
          <Plus className="h-4 w-4 mr-2" />
          New Receipt
        </Button>
      </div>

      {/* Receipts Table */}
      <Card className="shadow-sm border border-gray-100 rounded-xl overflow-hidden mt-6 bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f8f9fa] border-b border-gray-100">
                <TableHead className="font-semibold text-sm">Receipt ID</TableHead>
                <TableHead className="font-semibold text-sm">Supplier</TableHead>
                <TableHead className="font-semibold text-sm">Products</TableHead>
                <TableHead className="font-semibold text-sm">Total Quantity</TableHead>
                <TableHead className="font-semibold text-sm">Date</TableHead>
                <TableHead className="font-semibold text-sm">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => {
                const totalQty = receipt.products.reduce((sum, p) => sum + p.quantity, 0);
                return (
                  <TableRow key={receipt.id} className="hover:bg-gray-50/50 border-b border-gray-100 last:border-0">
                    <TableCell>
                      <span className="font-medium text-[#1F3A93] text-sm">{receipt.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[#5DADE2] text-sm">{receipt.supplier}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {receipt.products.map((p, idx) => (
                          <div key={idx} className="text-sm text-[#7F8C8D]">
                            {p.productName} <span className="text-[#1F3A93] font-medium">({p.quantity})</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-[#1F3A93] text-sm">{totalQty}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-400 text-sm">{receipt.date}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Receipt Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Receipt</DialogTitle>
            <DialogDescription>
              Add supplier information and products to receive
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="supplier">Supplier Name</Label>
              <Input
                id="supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Enter supplier name"
                className="border-[#e0e0e0]"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Add Products</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="product">Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="border-[#e0e0e0]">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                    className="border-[#e0e0e0]"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddProductToReceipt}
                className="mt-3 bg-[#5DADE2] hover:bg-[#4a9bcf]"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {selectedProducts.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Selected Products</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="w-16"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProducts.map((p, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{p.productName}</TableCell>
                        <TableCell>{p.quantity}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedProducts(selectedProducts.filter((_, i) => i !== idx))}
                            className="hover:bg-red-100 hover:text-red-600"
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleCreateReceipt('Waiting')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save as Waiting
            </Button>
            <Button
              onClick={() => handleCreateReceipt('Done')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Validate & Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}