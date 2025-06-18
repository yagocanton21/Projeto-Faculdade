require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Importar rotas
const alunoRoutes = require('./routes/aluno.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const turmaRoutes = require('./routes/turma.routes');
const professorRoutes = require('./routes/professor.routes');
const disciplinaRoutes = require('./routes/disciplina.routes');
const matriculaRoutes = require('./routes/matricula.routes');
const notaRoutes = require('./routes/nota.routes');
const responsavelRoutes = require('./routes/responsavel.routes');

// Inicializar aplicação express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Cabeçalhos de segurança
app.use(cors()); // Habilitar CORS
app.use(morgan('dev')); // Registro de logs
app.use(express.json()); // Processar corpos JSON
app.use(express.urlencoded({ extended: true })); // Processar corpos URL-encoded

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Sistema de Gerenciamento Escolar Infantil' });
});

// Rotas
app.use('/alunos', alunoRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/turmas', turmaRoutes);
app.use('/professores', professorRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/matriculas', matriculaRoutes);
app.use('/notas', notaRoutes);
app.use('/responsaveis', responsavelRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Erro interno do servidor',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;