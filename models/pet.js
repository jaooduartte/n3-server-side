import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  codigo_pet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome_pet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero_pet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altura_valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  alturaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tutorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'pet',
  timestamps: false,
});

export default Pet;
