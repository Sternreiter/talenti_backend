import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import { status } from './status-model';

export const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
  },
  token_user: {
    type: DataTypes.STRING
  }
}, {
  createdAt: true,
  updatedAt: true
});

status.hasMany(user, {
  foreignKey: 'statusId',
  sourceKey: 'id'
});
user.belongsTo(status, {
  foreignKey: 'statusId',
  targetKey: 'id'
})