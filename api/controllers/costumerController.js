import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Costumer } from '../models/index.js';
import config from '../config/index.js';

const register = async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 5);
    req.body.password = encryptedPass;

    const newCostum = await Costumer.create(req.body)
    newCostum.password = undefined;

    res.json({
      msg: 'Costumer registrado',
      data: newCostum,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body
  try {
    const costum = await Costumer.findOne({ email });
    if (!costum) {
      return res.status(401).json({
        msg: 'Credenciales erroneas'
      });
    }

    const match = await bcrypt.compare(password, costum.password);
    if (!match) {
      return res.status(401).json({
        msg: 'Credenciales erroneas',
      });
    }

    const payload = {
      costumId: costum.id,
    }

    const token = jwt.encode(payload, config.token.secret);
    return res.json({
      msg: 'Login correcto',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al hacer login',
    });
  }
};

const getAll = async (req, res) => {
  try {
    const costum = await Costumer.find({}, {password: 0});
    return res.json({
      msg: 'Costumers encontrados',
      data: costum,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener costumers',
      error,
    });
  }
};

export {
  register,
  login,
  getAll,
};
