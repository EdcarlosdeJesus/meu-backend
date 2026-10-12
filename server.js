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

// rota de saúde fictícia
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hospital: 'Hospital Fictício Central',
    pacientes: [
      { nome: 'João da Silva', idade: 45, diagnostico: 'Hipertensão' },
      { nome: 'Maria Oliveira', idade: 32, diagnostico: 'Diabetes tipo 2' }
    ]
  });
});

// rota de ping
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', reply: 'pong' });
});

// rota de erro simulado
app.get('/api/error', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Erro simulado para teste' });
});

// rota de finanças fictícia
app.get('/api/finance', (req, res) => {
  res.json({
    banco: 'Banco Fictício',
    contas: [
      { titular: 'Carlos Souza', saldo: 1500.75, moeda: 'BRL' },
      { titular: 'Ana Pereira', saldo: 3200.00, moeda: 'BRL' }
    ],
    transacoesRecentes: [
      { tipo: 'Depósito', valor: 500.00, data: '2026-10-10' },
      { tipo: 'Transferência', valor: 200.00, data: '2026-10-11' }
    ]
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
