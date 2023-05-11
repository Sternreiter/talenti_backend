import { Sequelize } from "sequelize";
require('dotenv').config();

export const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PASS}`, {
    host: 'talenti.cf9v4qqw2q2w.us-east-2.rds.amazonaws.com',
    dialect: 'postgres'
})