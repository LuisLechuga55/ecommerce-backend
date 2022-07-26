import dotenv from 'dotenv';

dotenv.config({});

export default {
  database: {
    uri: process.env.DB_URI,
    name: process.env.DB_NAME,
  },
  token: {
    secret: process.env.JWT_SECRET,
  },
};
