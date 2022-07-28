import { Order } from '../models/index.js';


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

const updateTotal = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('products');
    let newTotal = 0;
    order.products.forEach((product) => {
      newTotal += product.price;
    });
    return res.json({
      msg: 'Pedido actualizado',
      data: order,
      newTotal,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al calcular el Total'
    });
  }
};

const addDiscount = async (req, res) => {
  try {
    const discount = await Order.create({
      costumer: req.costum.id,
      products: req.body.products,
      discounts: req.body.discounts,
    });
    return res.json({
      msg: 'Descuento creado',
      data: discount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al añadir el Descuento',
      error,
    });
  }
};

const orderDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('products').populate('discounts');
    let totalOrder = 0;
    let newTotal = order.products.forEach((product) => {
      totalOrder += product.price;
    });

    if (order.discounts.typeDiscount == 'percent') {
      newTotal
    };

    if (order.discounts.typeDiscount == 'amount') {
      newTotal
    };
    return res.json({
      msg: 'Pedido actualizado con Descuento',
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al calcular el Descuento',
      error,
    });
  }
};

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


export {
  createOrder,
  getAllOrders,
  updateTotal,
  addDiscount,
  orderDiscount,
}
