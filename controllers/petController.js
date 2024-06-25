// controllers/petController.js
import Pet from '../models/pet.js';
import Altura from '../models/altura.js';
import Tutor from '../models/tutor.js';

export const createPet = async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const { codigo_pet, nome_pet, genero_pet, altura_valor, tutorId } = req.body;
        // Verificar se o tutorId existe na tabela TUTORS antes de inserir
        const tutor = await Tutor.findByPk(tutorId);
        if (!tutor) {
            return res.status(404).json({ error: 'Tutor não encontrado' });
        }
        
        let alturaId;
        if (altura_valor <= 15) {
            alturaId = 1; // Assume IDs predefinidos para 'pequeno'
        } else if (altura_valor <= 45) {
            alturaId = 2; // 'médio'
        } else {
            alturaId = 3; // 'alto'
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
                { model: Tutor, as: 'tutor' },  // Usar o alias definido na associação
                { model: Altura, as: 'altura' } // Usar o alias definido na associação
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
    const { id } = req.params;  // Garantir que está capturando o 'id' corretamente
    const { codigo_pet, nome_pet, genero_pet, altura_valor, tutorId } = req.body;
    
    try {
        const pet = await Pet.findByPk(id);  // Primeiro, encontrar o pet pelo ID
        if (!pet) {
            return res.status(404).json({ error: 'Pet not found' });  // Se não encontrar, retorna erro
        }

        // Se encontrar, atualiza as informações
        pet.codigo_pet = codigo_pet;
        pet.nome_pet = nome_pet;
        pet.genero_pet = genero_pet;
        pet.altura_valor = altura_valor;
        pet.tutorId = tutorId;
        
        await pet.save();  // Salva as atualizações no banco de dados

        res.status(200).json(pet);  // Retorna o pet atualizado
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
