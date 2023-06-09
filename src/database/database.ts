import { Sequelize } from "sequelize";
require('dotenv').config();

export const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PASS}`, {
    host: `${process.env.DATABASE_URL}`,
    dialect: 'postgres'
})