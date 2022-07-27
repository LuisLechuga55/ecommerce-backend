import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  informationProduct: {
    type: String,
    enum: ['specs', 'description'],
    default: 'description',
    required: true,
  }
});

export default mongoose.model('Product', productSchema);
