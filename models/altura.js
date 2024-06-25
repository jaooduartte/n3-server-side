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
  tableName: 'altura', // Assegure que o nome da tabela esteja em plural se necessário
  timestamps: false,
});

export default Altura;