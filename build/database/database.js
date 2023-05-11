"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
exports.sequelize = new sequelize_1.Sequelize(`${process.env.DATABASE_NAME}`, `${process.env.DATABASE_USER}`, `${process.env.DATABASE_PASS}`, {
    host: `${process.env.DATABASE_URL}`,
    dialect: 'postgres'
});
