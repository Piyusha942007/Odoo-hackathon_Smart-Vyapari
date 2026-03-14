import express from 'express';
import { createOperation, getOperations } from '../controllers/operationController.js';

const router = express.Router();

router.post('/', createOperation);
router.get('/', getOperations);

export default router;
