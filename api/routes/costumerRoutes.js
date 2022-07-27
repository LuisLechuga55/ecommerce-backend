import express from 'express';
import { costumerController } from '../controllers/index.js';
import { createCostumValidator, loginCostumValidator } from '../middlewares/index.js';

const router = express.Router();


router.post('/register', createCostumValidator, costumerController.register);

router.post('/login', loginCostumValidator, costumerController.login);

router.get('/', costumerController.getAll);


export default router;
