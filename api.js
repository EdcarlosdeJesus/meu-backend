// Importa o Express
const express = require('express');
const app = express();

// Porta padrão (Vercel define automaticamente, mas localmente usamos 3000)
const PORT = process.env.PORT || 3000;

// Rota de saúde (health check)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está saudável!' });
});

// Rota de ping (teste simples)
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', reply: 'pong' });
});

// Rota de erro controlado
app.get('/api/error', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Erro simulado para teste' });
});

// Rota principal de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
