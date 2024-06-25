-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS tutor_pet;
USE tutor_pet;

-- Cria a tabela Altura
CREATE TABLE IF NOT EXISTS Altura (
    id_altura INT AUTO_INCREMENT PRIMARY KEY,
    altura VARCHAR(255) NOT NULL
);

-- Insere os valores iniciais na tabela Altura
INSERT INTO Altura (altura) VALUES ('pequeno'), ('médio'), ('alto');

-- Cria a tabela Tutor
CREATE TABLE IF NOT EXISTS tutors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Cria a tabela Pet
CREATE TABLE IF NOT EXISTS Pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_pet VARCHAR(50) NOT NULL,
    nome_pet VARCHAR(255) NOT NULL,
    genero_pet VARCHAR(50) NOT NULL,
    altura_valor FLOAT NOT NULL,
    alturaId INT,
    tutorId INT,
    FOREIGN KEY (alturaId) REFERENCES Altura(id_altura),
    FOREIGN KEY (tutorId) REFERENCES Tutor(id)
);

-- Cria o usuário
CREATE USER 'joao@example'@'localhost' IDENTIFIED BY 'senha123';
GRANT ALL PRIVILEGES ON tutor_pet.* TO 'joao@example'@'localhost';
FLUSH PRIVILEGES;
