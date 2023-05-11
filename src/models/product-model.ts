import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { status } from './status-model';
import { supermarket } from './supermarket-model';

export const product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.DECIMAL
    },
    expired_at: {
        type: DataTypes.DATEONLY
    }
}, {
    createdAt: true,
    updatedAt: true
});

status.hasMany(product, {
    foreignKey: 'statusId',
    sourceKey: 'id'
});
product.belongsTo(status, {
    foreignKey: 'statusId',
    targetKey: 'id'
})

supermarket.hasMany(product, {
    foreignKey: 'supermarketid',
    sourceKey: 'id'
});
product.belongsTo(supermarket, {
    foreignKey: 'supermarketid',
    targetKey: 'id'
})