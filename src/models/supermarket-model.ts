import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { status } from './status-model';

export const supermarket = sequelize.define('supermarket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.STRING
  },
  opening: {
    type: DataTypes.TIME
  },
  closing: {
    type: DataTypes.TIME
  }
}, {
  createdAt: true,
  updatedAt: true
});

status.hasMany(supermarket, {
  foreignKey: 'statusId',
  sourceKey: 'id'
});
supermarket.belongsTo(status, {
  foreignKey: 'statusId',
  targetKey: 'id'
})