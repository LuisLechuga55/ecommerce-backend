import { Discount } from '../models/index.js';

const createDiscount = async (req, res) => {
  try {
    const newDiscount = await Discount.create(req.body);
    return res.json({
      msg: 'Descuento creado',
      data: newDiscount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear el Descuento',
      error
    });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discount = await Discount.find({
      adminId: req.params,
    });
    return res.json({
      msg: 'Descuentos encontrados',
      discount,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar los Descuentos',
      error
    });
  }
};

export {
  createDiscount,
  getAllDiscounts,
}
