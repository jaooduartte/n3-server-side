import express from 'express';
import authenticateJWT from '../middleware/authMiddleware.js';
import { getPetsByAlturaId } from '../controllers/alturaController.js';

const router = express.Router();

router.get('/:id/pets', authenticateJWT, getPetsByAlturaId);

export default router;