import { Product } from '../models/index.js';

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.json({
      msg: 'Producto creado',
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear Producto',
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const productUpdate = await Product.findByIdAndUpdate(id, req.body);
    return res.json({
      msg: 'Producto actualizado',
      data: productUpdate,
    });      
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar Producto',
      data: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const productDelete = await Product.findByIdAndDelete(id);
    return res.status(200).json({
      msg: 'Producto borrado',
      data: productDelete,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar Producto',
      error,
    });
  }
};

const getProductsFilters = async (req, res) => {
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  
  const prices = {
    price : { $gte :  minPrice, $lte :  maxPrice},
  };

  delete req.query.minPrice;
  delete req.query.maxPrice;

  const filters = req.query;

  const filterObject = Object.assign({}, prices, filters);

  try {
    const products = await Product.find(filterObject);
    return res.json({
      msg: 'Productos encontrados',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar Productos',
      error,
    });
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsFilters,
};
