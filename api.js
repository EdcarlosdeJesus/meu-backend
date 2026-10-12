const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Rota principal
app.get('/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está saudável!' });
});

// Rota de ping
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', reply: 'pong' });
});

// Rota de erro simulado
app.get('/error', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Erro simulado para teste' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
