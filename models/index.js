import sequelize from '../config/database.js';
import Altura from './altura.js';
import Pet from './pet.js';
import Tutor from './tutor.js';

// Definir associações
Altura.hasMany(Pet, { foreignKey: 'alturaId' });
Pet.belongsTo(Altura, { foreignKey: 'alturaId' });

Tutor.hasMany(Pet, { foreignKey: 'tutorId' });
Pet.belongsTo(Tutor, { foreignKey: 'tutorId' });

const db = {
  sequelize,
  Altura,
  Pet,
  Tutor,
};

export default db;
