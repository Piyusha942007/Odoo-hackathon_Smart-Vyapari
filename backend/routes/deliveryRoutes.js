import express from 'express';
import { createDelivery, getDeliveries } from '../controllers/deliveryController.js';

const router = express.Router();

router.get('/', getDeliveries);
router.post('/', createDelivery);

export default router;
