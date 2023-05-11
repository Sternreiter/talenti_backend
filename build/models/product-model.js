"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const status_model_1 = require("./status-model");
const supermarket_model_1 = require("./supermarket-model");
exports.product = database_1.sequelize.define('product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    expired_at: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    createdAt: true,
    updatedAt: true
});
status_model_1.status.hasMany(exports.product, {
    foreignKey: 'statusId',
    sourceKey: 'id'
});
exports.product.belongsTo(status_model_1.status, {
    foreignKey: 'statusId',
    targetKey: 'id'
});
supermarket_model_1.supermarket.hasMany(exports.product, {
    foreignKey: 'supermarketid',
    sourceKey: 'id'
});
exports.product.belongsTo(supermarket_model_1.supermarket, {
    foreignKey: 'supermarketid',
    targetKey: 'id'
});
