import express from 'express';
import { createReceipt, getReceipts } from '../controllers/receiptController.js';

const router = express.Router();

router.get('/', getReceipts);
router.post('/', createReceipt);

export default router;
