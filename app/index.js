require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const alunoRoutes = require('./routes/aluno.routes');
const professorRoutes = require('./routes/professor.routes');
const turmaRoutes = require('./routes/turma.routes');
const disciplinaRoutes = require('./routes/disciplina.routes');
const notaRoutes = require('./routes/nota.routes');
const responsavelRoutes = require('./routes/responsavel.routes');
const matriculaRoutes = require('./routes/matricula.routes');
const usuarioRoutes = require('./routes/usuario.routes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes);
app.use('/turmas', turmaRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/notas', notaRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/matriculas', matriculaRoutes);
app.use('/usuarios', usuarioRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Sistema de Gerenciamento Escolar Infantil' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Erro interno do servidor',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;