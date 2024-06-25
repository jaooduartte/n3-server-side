import Pet from '../models/pet.js';
import Altura from '../models/altura.js';
import Tutor from '../models/tutor.js';

export const createPet = async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const { codigo_pet, nome_pet, genero_pet, altura_valor, tutorId } = req.body;
        
        const tutor = await Tutor.findByPk(tutorId);
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }
        
        let alturaId;
        if (altura_valor <= 15) {
            alturaId = 1;
        } else if (altura_valor <= 45) {
            alturaId = 2;
        } else {
            alturaId = 3;
        }
        const newPet = await Pet.create({
            codigo_pet, nome_pet, genero_pet, altura_valor, alturaId, tutorId
        });
        res.status(201).json(newPet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getPets = async (req, res) => {
    try {
        const pets = await Pet.findAll();
        res.status(200).json(pets);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findByPk(id, {
            include: [
                { model: Tutor, as: 'tutor' },
                { model: Altura, as: 'altura' } 
            ]
        });
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.status(404).json({ error: 'Pet not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updatePet = async (req, res) => {
    const { id } = req.params;
    const { codigo_pet, nome_pet, genero_pet, altura_valor, tutorId } = req.body;
    
    try {
        const pet = await Pet.findByPk(id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        
        pet.codigo_pet = codigo_pet;
        pet.nome_pet = nome_pet;
        pet.genero_pet = genero_pet;
        pet.altura_valor = altura_valor;
        pet.tutorId = tutorId;
        
        await pet.save();

        res.status(200).json(pet);
    } catch (err) {
        console.error("Erro ao atualizar o pet: ", err);
        res.status(400).json({ error: 'Error updating pet' });
    }
};

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Pet.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Pet deleted' });
        } else {
            res.status(404).json({ error: 'Pet not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
