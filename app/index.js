require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Importar rotas
const alunoRoutes = require('./routes/aluno.routes');
const matriculaRoutes = require('./routes/matricula.routes');
const notaRoutes = require('./routes/nota.routes');
const professorRoutes = require('./routes/professor.routes');
const presencaRoutes = require('./routes/presenca.routes');

// Inicializar aplicação express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet()); // Cabeçalhos de segurança
app.use(cors()); // Habilitar CORS
app.use(morgan('dev')); // Registro de logs
app.use(express.json()); // Processar corpos JSON
app.use(express.urlencoded({ extended: true })); // Processar corpos URL-encoded
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para configurar charset UTF-8
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Sistema de Gerenciamento Escolar Infantil' });
});

// Rota /api
app.get('/api', (req, res) => {
  res.json({ message: 'API do Sistema de Gerenciamento Escolar Infantil', status: 'online' });
});

// Rotas API
app.use('/api/alunos', alunoRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/presencas', presencaRoutes);

// Rotas EJS
app.get('/views/alunos', async (req, res) => {
  try {
    const Aluno = require('./models/aluno.model');
    const alunos = await Aluno.findAll();
    res.render('alunos', { alunos });
  } catch (error) {
    res.status(500).send('Erro ao carregar alunos');
  }
});

app.get('/views/professores', async (req, res) => {
  try {
    const Professor = require('./models/professor.model');
    const professores = await Professor.findAll();
    res.render('professores', { professores });
  } catch (error) {
    res.status(500).send('Erro ao carregar professores');
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Erro interno do servidor',
  });
});

// Função de broadcast para WebSocket
function broadcast(type, payload) {
  const message = JSON.stringify({ type, data: payload, timestamp: Date.now() });
  console.log(`📡 Broadcasting: ${type}`, payload);
  console.log(`Clientes conectados: ${wss.clients.size}`);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
        console.log('✅ Mensagem enviada para cliente');
      } catch (err) {
        console.error('Erro ao enviar mensagem WS:', err);
      }
    }
  });
}

// Expor broadcast para os controllers
app.locals.broadcast = broadcast;

// WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');
  ws.isAlive = true;
  
  ws.send(JSON.stringify({ type: 'connection', data: { message: 'Conectado ao servidor' } }));
  
  ws.on('message', (message) => {
    console.log('Mensagem recebida:', message.toString());
    try {
      const data = JSON.parse(message.toString());
      ws.send(JSON.stringify({ type: 'response', data: { received: data, timestamp: Date.now() } }));
    } catch (error) {
      ws.send(JSON.stringify({ type: 'error', data: { message: 'Erro ao processar mensagem' } }));
    }
  });

  ws.on('pong', () => {
    ws.isAlive = true;
  });
  
  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

// Heartbeat: ping/pong para limpar conexões mortas
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);

server.on('close', () => {
  clearInterval(interval);
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`WebSocket disponível em ws://localhost:${PORT}`);
});

module.exports = app;