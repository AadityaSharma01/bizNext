import express from 'express';
import { postProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',authMiddleware, postProduct)
router.delete('/:id', authMiddleware, deleteProduct)
router.get('/', authMiddleware, getProduct)
router.put('/:id', authMiddleware ,updateProduct)

export default router;