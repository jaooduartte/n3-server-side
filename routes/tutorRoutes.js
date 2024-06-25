// routes/tutorRoutes.js
import express from 'express';
import { registerTutor, getTutors, getTutorById, updateTutor, deleteTutor } from '../controllers/tutorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Pet from '../models/pet.js';

const router = express.Router();

router.post('/', registerTutor);
router.get('/', getTutors);
router.get('/:id', getTutorById);
router.put('/:id', updateTutor);
router.delete('/:id', deleteTutor);

// Rota adicional para listar pets por tutor
router.get('/:id/pets', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pets = await Pet.findAll({ where: { tutorId: id } });
    res.status(200).json(pets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
