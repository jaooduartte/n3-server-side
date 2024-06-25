import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Altura = sequelize.define('Altura', {
  id_altura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  altura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'altura',
  timestamps: false,
});

export default Altura;