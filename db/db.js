import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the Sequelize database');
  })
  .catch((err) => {
    console.error('Error authenticating Sequelize:', err);
  });
