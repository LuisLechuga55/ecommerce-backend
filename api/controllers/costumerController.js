import * as bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Costumer } from '../models/index.js';
import config from '../config/index.js';

const create = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const newCostumer = {
      ...req.body,
      password: hashedPassword,
    };
    const createdCostumer = await Costumer.create(newCostumer);
    res.status(201).json(createdCostumer);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const costumer = await Costumer.findOne(req.email);
    if (!costumer) {
      return res.status(401).json({
        msg: 'Credenciales erróneas',
      });
    };

    const compared = await bcrypt.compare(req.password);
    if (!compared) {
      return res.status(401).json({
        msg: 'Bad credentials',
      });
    };

    costumer.password = undefined;

    const token = jwt.encode(costumer, config.token.secret);
    return res.json({
      msg: 'Login satisfactorio',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al hacer login',
    });
  }
};

export {
  create,
  login,
};
