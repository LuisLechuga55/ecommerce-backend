import * as bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Admin } from '../models/index.js';
import config from '../config/index.js';

const create = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 5);
    const newAdmin = {
      ...req.body,
      password: hashedPassword,
    };
    const createdAdmin = await Admin.create(newAdmin);
    res.status(201).json(createdAdmin);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const admin = await Admin.findOne(req.email);
    if (!admin) {
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

    admin.password = undefined;

    const token = jwt.encode(admin, config.token.secret);
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
