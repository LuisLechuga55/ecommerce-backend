import { Order } from '../models/index.js';


const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({
      customId: req.params,
    });
    return res.json({
      msg: 'Pedidos obtenidos',
      order,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener Pedidos',
      error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      costumer: req.costum.id,
      products: req.body.products,
    });
    return res.json({
      msg: 'Pedido creado',
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear Pedido',
      error,
    });
  }
};


export {
  createOrder,
  getAllOrders,
}
