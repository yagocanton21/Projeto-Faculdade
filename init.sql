-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS escola_infantil;
USE escola_infantil;

-- Tabela de Alunos
CREATE TABLE IF NOT EXISTS alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  endereco VARCHAR(255),
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Professores
CREATE TABLE IF NOT EXISTS professores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL 
);

-- Tabela de Matrículas
CREATE TABLE IF NOT EXISTS matriculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  turma VARCHAR(50) NOT NULL,
  data_matricula DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Ativa',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de Notas
CREATE TABLE IF NOT EXISTS notas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  disciplina VARCHAR(100) NOT NULL,
  valor DECIMAL(4,2) NOT NULL,
  data_avaliacao DATE,
  observacao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Tabela de Presenças
CREATE TABLE IF NOT EXISTS presencas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT NOT NULL,
  data_aula DATE NOT NULL,
  presente BOOLEAN NOT NULL DEFAULT TRUE,
  observacao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

-- Inserir dados iniciais
INSERT INTO professores (nome, email, telefone) VALUES
('Maria Silva', 'maria.silva@escola.com', '(11) 98765-4321'),
('João Santos', 'joao.santos@escola.com', '(11) 91234-5678'),
('Ana Costa', 'ana.costa@escola.com', '(11) 99999-1111'),
('Pedro Oliveira', 'pedro.oliveira@escola.com', '(11) 95555-2222'),
('Carla Mendes', 'carla.mendes@escola.com', '(11) 94444-3333'),
('Roberto Lima', 'roberto.lima@escola.com', '(11) 96666-4444'),
('Fernanda Souza', 'fernanda.souza@escola.com', '(11) 97777-5555'),
('Carlos Pereira', 'carlos.pereira@escola.com', '(11) 98888-6666'),
('Juliana Alves', 'juliana.alves@escola.com', '(11) 99999-7777'),
('Ricardo Martins', 'ricardo.martins@escola.com', '(11) 91111-8888'),
('Luciana Ferreira', 'luciana.ferreira@escola.com', '(11) 92222-9999'),
('Marcos Rodrigues', 'marcos.rodrigues@escola.com', '(11) 93333-1010'),
('Patricia Gomes', 'patricia.gomes@escola.com', '(11) 94444-1111'),
('Eduardo Barbosa', 'eduardo.barbosa@escola.com', '(11) 95555-1212'),
('Renata Cardoso', 'renata.cardoso@escola.com', '(11) 96666-1313'),
('Thiago Nascimento', 'thiago.nascimento@escola.com', '(11) 97777-1414'),
('Vanessa Moreira', 'vanessa.moreira@escola.com', '(11) 98888-1515'),
('Bruno Teixeira', 'bruno.teixeira@escola.com', '(11) 99999-1616'),
('Camila Ribeiro', 'camila.ribeiro@escola.com', '(11) 91111-1717'),
('Daniel Castro', 'daniel.castro@escola.com', '(11) 92222-1818'),
('Elaine Dias', 'elaine.dias@escola.com', '(11) 93333-1919'),
('Fabio Monteiro', 'fabio.monteiro@escola.com', '(11) 94444-2020'),
('Gabriela Freitas', 'gabriela.freitas@escola.com', '(11) 95555-2121'),
('Henrique Vieira', 'henrique.vieira@escola.com', '(11) 96666-2222'),
('Isabela Campos', 'isabela.campos@escola.com', '(11) 97777-2323'),
('Jorge Araujo', 'jorge.araujo@escola.com', '(11) 98888-2424'),
('Kelly Machado', 'kelly.machado@escola.com', '(11) 99999-2525'),
('Leonardo Cunha', 'leonardo.cunha@escola.com', '(11) 91111-2626'),
('Monica Pinto', 'monica.pinto@escola.com', '(11) 92222-2727'),
('Nathan Correia', 'nathan.correia@escola.com', '(11) 93333-2828');

INSERT INTO alunos (nome, data_nascimento, endereco, telefone) VALUES
('Lucas Pereira', '2018-03-15', 'Rua das Flores, 123', '(11) 91111-1111'),
('Sofia Rodrigues', '2017-08-22', 'Av. Central, 456', '(11) 92222-2222'),
('Gabriel Lima', '2018-11-10', 'Rua do Sol, 789', '(11) 93333-3333'),
('Isabella Santos', '2017-05-30', 'Rua da Lua, 321', '(11) 94444-4444'),
('Miguel Costa', '2018-01-18', 'Av. das Estrelas, 654', '(11) 95555-5555');

INSERT INTO matriculas (aluno_id, turma, data_matricula, status) VALUES
(1, 'Turma A', '2023-02-01', 'Ativa'),
(2, 'Turma B', '2023-02-01', 'Ativa'),
(3, 'Turma A', '2023-02-15', 'Ativa'),
(4, 'Turma C', '2023-03-01', 'Ativa'),
(5, 'Turma B', '2023-02-10', 'Ativa');

INSERT INTO notas (aluno_id, disciplina, valor, data_avaliacao, observacao) VALUES
(1, 'Matemática', 8.5, '2023-05-15', 'Boa participação'),
(1, 'Português', 9.0, '2023-05-20', 'Excelente leitura'),
(2, 'Matemática', 7.5, '2023-05-15', 'Precisa melhorar'),
(2, 'Português', 8.0, '2023-05-20', 'Boa evolução'),
(3, 'Matemática', 9.5, '2023-05-15', 'Destaque da turma'),
(4, 'Português', 8.5, '2023-05-20', 'Muito criativo'),
(5, 'Matemática', 7.0, '2023-05-15', 'Requer atenção');

INSERT INTO presencas (aluno_id, data_aula, presente, observacao) VALUES
(1, '2023-05-15', TRUE, 'Presente'),
(1, '2023-05-16', TRUE, 'Presente'),
(2, '2023-05-15', FALSE, 'Faltou por doença'),
(2, '2023-05-16', TRUE, 'Presente'),
(3, '2023-05-15', TRUE, 'Presente'),
(3, '2023-05-16', TRUE, 'Presente'),
(4, '2023-05-15', TRUE, 'Presente'),
(5, '2023-05-15', FALSE, 'Faltou sem justificativa');