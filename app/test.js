const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'API de teste funcionando!' });
});

app.get('/disciplinas', (req, res) => {
  res.json({ message: 'Rota de disciplinas funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor de teste rodando na porta ${PORT}`);
});

module.exports = app;