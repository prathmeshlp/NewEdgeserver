import express from 'express';
import { generateProducts, getProducts, reduceStock, increaseEvenStock } from '../controllers/productController';

const router = express.Router();

router.post('/generate', generateProducts);
router.get('/', getProducts);
router.patch('/reduce', reduceStock);
router.patch('/increase-even', increaseEvenStock);

export default router;