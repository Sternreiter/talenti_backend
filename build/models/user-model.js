"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const status_model_1 = require("./status-model");
exports.user = database_1.sequelize.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    token_user: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    createdAt: true,
    updatedAt: true
});
status_model_1.status.hasMany(exports.user, {
    foreignKey: 'statusId',
    sourceKey: 'id'
});
exports.user.belongsTo(status_model_1.status, {
    foreignKey: 'statusId',
    targetKey: 'id'
});
