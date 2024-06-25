import db from '../models/index.js';

const { Pet, Altura } = db;

export const getPetsByAlturaId = async (req, res) => {
  try {
    const { id } = req.params;
    const altura = await Altura.findByPk(id, { include: Pet });
    if (altura) {
      res.status(200).json(altura.Pets);
    } else {
      res.status(404).json({ error: 'Altura not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
