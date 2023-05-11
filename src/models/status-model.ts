import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

export const status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: true,
    updatedAt: true
});