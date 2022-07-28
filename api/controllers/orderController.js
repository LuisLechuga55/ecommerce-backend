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
      discount: req.body.discount,
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
    const order = await Order.findById(id).populate('products').populate('discount');
    let totalOrder = 0;
    order.products.forEach((product) => {
      totalOrder += product.price;
    });

    console.log(order);
    const percent = order.discount.typeDiscount === 'percent';
    const percentNum = order.discount.numDiscount;

    const amount = order.discount.typeDiscount === 'amount';
    const amountNum = order.discount.numDiscount;

    if (percent) {
      totalOrder -= totalOrder * percentNum / 100
    };

    if (amount) {
      totalOrder -= amountNum
    };
    order.total = totalOrder
    await order.save();
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
