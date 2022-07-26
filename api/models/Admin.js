import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  } ,
  lastName: {
    type: String,
    required: true,
  } ,
  birthday: {
    type: Date,
    required: true,
  } ,
  idNumber: {
    type: Number,
    required: true,
  } ,
  addres: {
    type: String,
    required: true,
  } ,
  phone: {
    type: String,
    required: true,
  } ,
  email: {
    type: String,
    required: true,
    unque: true,
  } ,
  password: {
    type: String,
    required: true,
    unique: true,
  }
});

export default mongoose.model('Admin', adminSchema);
