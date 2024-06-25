// controllers/tutorController.js
import Tutor from '../models/tutor.js';
import bcrypt from 'bcrypt';
import Pet from '../models/pet.js';

export const registerTutor = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        const newTutor = await Tutor.create({
            email,
            senha: hashedPassword
        });
        res.status(201).json({ message: "Tutor registrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao registrar tutor." });
    }
};

export const getTutors = async (req, res) => {
    try {
        const tutors = await Tutor.findAll();
        res.status(200).json(tutors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const tutor = await Tutor.findByPk(id);
        if (tutor) {
            res.status(200).json(tutor);
        } else {
            res.status(404).json({ message: 'Tutor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, senha } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        const [updated] = await Tutor.update({ email, senha: hashedPassword }, {
            where: { id }
        });
        if (updated) {
            const updatedTutor = await Tutor.findByPk(id);
            res.status(200).json(updatedTutor);
        } else {
            res.status(404).json({ message: 'Tutor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tutor.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Tutor deleted' });
        } else {
            res.status(404).json({ message: 'Tutor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Função para consultar pets por tutor
export const getPetsByTutorId = async (req, res) => {
    try {
      const { id } = req.params;
      const tutor = await Tutor.findByPk(id, { include: Pet });
      if (tutor) {
        res.status(200).json(tutor.Pets);
      } else {
        res.status(404).json({ error: 'Tutor not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };