import Tutor from '../models/tutor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { cpf, nome, email, senha } = req.body;

  try {

    const existingTutor = await Tutor.findOne({ where: { cpf } });
    if (existingTutor) {
      return res.status(409).json({ message: "CPF já registrado." });
    }

    console.log("Registrando novo tutor:", nome, email);


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    console.log("Senha hash:", hashedPassword);

    const tutor = await Tutor.create({
      cpf,
      nome,
      email,
      senha: hashedPassword
    });

    console.log("Tutor criado:", tutor);

    res.status(201).json({ message: "Tutor registrado com sucesso!", tutorId: tutor.id });
  } catch (error) {
    console.error("Erro ao registrar usuário: ", error);
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    
    const tutor = await Tutor.findOne({ where: { email }, attributes: ['id', 'nome', 'email', 'cpf', 'senha'] });
    if (!tutor) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    console.log('Senha (req.body):', senha);
    console.log('Senha (DB):', tutor.senha);

    const validPassword = await bcrypt.compare(senha, tutor.senha);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    
    const token = jwt.sign({ id: tutor.id, email: tutor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login bem-sucedido.', token });
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};