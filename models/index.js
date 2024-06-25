import sequelize from '../config/database.js';
import Altura from './altura.js';
import Tutor from './tutor.js';
import Pet from './pet.js';

Pet.belongsTo(Altura, { foreignKey: 'alturaId', as: 'altura' });
Altura.hasMany(Pet, { foreignKey: 'alturaId' });

Pet.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });
Tutor.hasMany(Pet, { foreignKey: 'tutorId' });

const db = {
  sequelize,
  Altura,
  Tutor,
  Pet
};

export default db;