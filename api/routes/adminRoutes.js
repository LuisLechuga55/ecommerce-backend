import express from 'express';
import { adminController } from '../controllers/index.js';
import { createAdminValidator, loginAdminValidator } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', createAdminValidator, adminController.register);

router.post('/login', loginAdminValidator, adminController.login);

router.get('/', adminController.getAll);

export default router;
