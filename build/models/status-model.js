"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
exports.status = database_1.sequelize.define('status', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true
});
