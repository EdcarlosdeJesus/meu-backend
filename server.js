const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// rota principal
app.get('/', (req, res) => {
  res.send('Backend simples rodando na Vercel!');
});

// rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API está saudável!' });
});

// rota de ping
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', reply: 'pong' });
});

// rota de erro simulado
app.get('/api/error', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Erro simulado para teste' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
