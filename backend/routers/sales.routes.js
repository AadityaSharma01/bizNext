import express from 'express'
import { postSales, putSales, getSales, deleteSales, getMonthlySalesChartData } from '../controllers/sales.controllers.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/postSales', authMiddleware, postSales)
router.put('/:id', authMiddleware, putSales)
router.get('/', authMiddleware, getSales)
router.delete('/', authMiddleware, deleteSales)
router.get('/sales-chart-data', authMiddleware, getMonthlySalesChartData)

export default router;