
import express from 'express';
const router = express.Router();

import authRoutes from './authRoutes.js';
import tutorRoutes from './tutorRoutes.js';
import petRoutes from './petRoutes.js';
import alturaRoutes from './alturaRoutes.js';

router.use('/auth', authRoutes);
router.use('/tutors', tutorRoutes);
router.use('/pets', petRoutes);
router.use('/altura', alturaRoutes);

export default router;
