import express from 'express';
import { getLedger } from '../controllers/ledgerController.js';

const router = express.Router();

router.get('/', getLedger);

export default router;
