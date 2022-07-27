import jwt from 'jwt-simple';
import config from '../config/index.js';
import { Costumer } from '../models/index.js';

const protectedCostum = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      msg: 'Token requerido',
    });
  }
  try {
    const payload = jwt.decode(token, config.token.secret);
    const costum = await Costumer.findById(payload.costumId);
    if (!costum) {
      return res.status(401).json('No has iniciado sesion');
    }
    req.costum = costum;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token requerido',
      error,
    });
  }
};

export default protectedCostum;