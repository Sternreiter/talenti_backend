"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supermarket = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const status_model_1 = require("./status-model");
exports.supermarket = database_1.sequelize.define('supermarket', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    opening: {
        type: sequelize_1.DataTypes.TIME
    },
    closing: {
        type: sequelize_1.DataTypes.TIME
    }
}, {
    createdAt: true,
    updatedAt: true
});
status_model_1.status.hasMany(exports.supermarket, {
    foreignKey: 'statusId',
    sourceKey: 'id'
});
exports.supermarket.belongsTo(status_model_1.status, {
    foreignKey: 'statusId',
    targetKey: 'id'
});
