import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { Admin } from '../models/index.js';
import config from '../config/index.js';

const register = async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 5);
    req.body.password = encryptedPass;

    const newAdmin = await Admin.create(req.body)
    newAdmin.password = undefined;

    res.json({
      msg: 'Admin registrado',
      data: newAdmin,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        msg: 'Credenciales erroneas'
      });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({
        msg: 'Credenciales erroneas',
      });
    }

    const payload = {
      adminId: admin.id,
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
    const admin = await Admin.find({}, {password: 0});
    return res.json({
      msg: 'Admins encontrados',
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener admins',
      error
    });
  }
};

export {
  register,
  login,
  getAll,
};
