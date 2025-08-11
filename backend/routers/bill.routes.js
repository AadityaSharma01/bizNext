import express from "express";
import { createBillItem, getAllBillItems, updateBillItems, deleteBill } from "../controllers/bill.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBillItem);
router.get("/", authMiddleware, getAllBillItems);
router.put("/:id", authMiddleware, updateBillItems);
router.delete("/", authMiddleware, deleteBill);


export default router;