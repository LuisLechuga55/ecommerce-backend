import express from 'express';
import { orderController } from '../controllers/index.js';
import { protectedCostum } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(protectedCostum, orderController.createOrder)
  .get(protectedCostum, orderController.getAllOrders)


export default router;
