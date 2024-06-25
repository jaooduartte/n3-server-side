
import Pet from '../models/pet.js';

export const getPetsByAlturaId = async (req, res) => {
    try {
        const { id } = req.params; 
        const pets = await Pet.findAll({
            where: { alturaId: id }
        });
        if (pets.length > 0) {
            res.status(200).json(pets);
        } else {
            res.status(404).json({ message: 'No pets found for this height.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};