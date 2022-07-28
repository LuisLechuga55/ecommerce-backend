import express from 'express';
import { orderController } from '../controllers/index.js';
import { protectedCostum } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .post(protectedCostum, orderController.createOrder)
  .get(protectedCostum, orderController.getAllOrders);

router
  .route('/:id/total')
  .put(protectedCostum, orderController.updateTotal);

router
  .route('/:id/discount')
  .post(protectedCostum, orderController.addDiscount);

router
  .route('/:id/discount/total')
  .put(protectedCostum, orderController.orderDiscount);

export default router;
