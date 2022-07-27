import jwt from 'jwt-simple';
import config from '../config/index.js';
import { Admin } from '../models/index.js';

const protectedAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      msg: 'Token requerido',
    });
  }
  try {
    const payload = jwt.decode(token, config.token.secret);
    const admin = await Admin.findById(payload.userId);
    if (!admin) {
      return res.status(401).json('No tienes autorizacion');
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token requerido',
      error,
    });
  }
};

export default protectedAdmin;
