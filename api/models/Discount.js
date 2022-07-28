import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
  typeDiscount: {
    type: String,
    enum: ['percent', 'amount'],
    required: true,
  },
  numDiscount: {
    type: Number,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  }
});


export default mongoose.model('Discount', discountSchema);
