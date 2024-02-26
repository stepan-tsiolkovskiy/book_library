import { Sequelize } from 'sequelize';
import pgk from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pgk;

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

export const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the Sequelize database');
  })
  .catch((err) => {
    console.error('Error authenticating Sequelize:', err);
  });
