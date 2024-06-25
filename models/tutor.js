// models/tutor.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Pet from './pet.js';

const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Garantir que o email seja único
  },
  cpf: {
    type: DataTypes.STRING(11),  // Especifica o tamanho do CPF para validação
    allowNull: false,
    unique: true,  // Garantir que o CPF seja único
  },
  senha: {
    type: DataTypes.STRING,  // Adicionar campo para a senha
    allowNull: false,
  }
}, {
  tableName: 'tutors',  // Garantir que o nome da tabela esteja correto
  timestamps: false,    // Desativa os timestamps se não estiverem sendo usados
});

Tutor.hasMany(Pet, { foreignKey: 'tutorId' });  // Associação com a tabela Pet
Pet.belongsTo(Tutor, { foreignKey: 'tutorId' });  // Associação inversa

export default Tutor;