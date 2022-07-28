import express from 'express';
import { discountController } from '../controllers/index.js';
import { protectedAdmin } from '../middlewares/index.js';

const router = express.Router();


router
  .route('/')
  .post(protectedAdmin, discountController.createDiscount)
  .get(protectedAdmin, discountController.getAllDiscounts);


export default router;
