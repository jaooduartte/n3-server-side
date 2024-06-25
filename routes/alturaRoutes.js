import express from 'express';
import { getPetsByAlturaId } from '../controllers/alturaController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id/pets', authenticateJWT, getPetsByAlturaId);

export default router;
