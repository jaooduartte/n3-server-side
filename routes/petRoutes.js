
import express from 'express';
import { createPet, getPets, getPetById, updatePet, deletePet } from '../controllers/petController.js';
import authenticateJWT from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/', authenticateJWT, createPet);
router.get('/', authenticateJWT, getPets);
router.get('/:id', authenticateJWT, getPetById);
router.put('/:id', authenticateJWT, updatePet);
router.delete('/:id', authenticateJWT, deletePet);

export default router;
