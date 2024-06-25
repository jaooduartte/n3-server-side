// controllers/authController.js

import Tutor from '../models/tutor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { cpf, nome, email, senha } = req.body;

  try {
    // Verifica se já existe um tutor com o mesmo CPF
    const existingTutor = await Tutor.findOne({ where: { cpf } });
    if (existingTutor) {
      return res.status(409).json({ message: "CPF já registrado." });
    }

    console.log("Registrando novo tutor:", nome, email);

    // Geração do hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    console.log("Senha hash:", hashedPassword);  // Log do hash para verificar se está sendo criado

    // Criação do tutor com senha hash
    const tutor = await Tutor.create({
      cpf,
      nome,
      email,
      senha: hashedPassword
    });

    console.log("Tutor criado:", tutor);  // Verifique os detalhes do tutor, incluindo a senha hash

    res.status(201).json({ message: "Tutor registrado com sucesso!", tutorId: tutor.id });
  } catch (error) {
    console.error("Erro ao registrar usuário: ", error);
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    // Inclui a senha na seleção para poder comparar
    const tutor = await Tutor.findOne({ where: { email }, attributes: ['id', 'nome', 'email', 'cpf', 'senha'] });
    if (!tutor) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    console.log('Senha (req.body):', senha);  // Log da senha enviada na requisição
    console.log('Senha (DB):', tutor.senha);  // Log da senha armazenada no banco de dados

    const validPassword = await bcrypt.compare(senha, tutor.senha);
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Geração do token JWT com a duração de 1 hora
    const token = jwt.sign({ id: tutor.id, email: tutor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login bem-sucedido.', token });
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};