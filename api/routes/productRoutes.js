import express from 'express';
import { productController } from '../controllers/index.js';
import { protectedAdmin } from '../middlewares/index.js';

const router =  express.Router();

router
  .route('/')
  .post(protectedAdmin, productController.createProduct)
  .get(productController.getProductsFilters);


router
  .route('/:id')
  .put(protectedAdmin, productController.updateProduct)
  .delete(protectedAdmin, productController.deleteProduct);


export default router;
