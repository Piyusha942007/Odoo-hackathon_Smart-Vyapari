import express from 'express';
import { getProducts, createProduct, getProductInventory } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:id/inventory', getProductInventory);

export default router;
