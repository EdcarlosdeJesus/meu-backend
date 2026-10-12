const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Rota principal de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está saudável!' });
});

// Rota de ping
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', reply: 'pong' });
});

// Rota de erro simulado
app.get('/api/error', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Erro simulado para teste' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
