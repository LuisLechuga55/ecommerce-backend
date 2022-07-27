import express from 'express';
import { costumerRoutes, adminRoutes, productRoutes, orderRoutes } from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/api', (_, res) => {
  return res.json({
    msg: 'API funcionando',
  });
});


api.use('/ecommerce/admin', adminRoutes);

api.use('/ecommerce/costumer', costumerRoutes);

api.use('/ecommerce/product', productRoutes);

api.use('/ecommerce/order', orderRoutes);

export default api;
