import express from 'express';
import { adminController } from '../controllers/index.js';
import { createAdminValidator, loginAdminValidator } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', createAdminValidator, adminController.create);

router.post('/login', loginAdminValidator, adminController.login);

export default router;
