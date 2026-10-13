const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// rota principal
// rota principal personalizada
app.get('/', (req, res) => {
  res.send(`
    🚀 Bem-vindo à API do Ed Carlos!<br><br>
    Este é um projeto de <b>estudo com a ferramenta Cequence</b>.<br><br>
    Explore as rotas disponíveis:<br>
    - <a href="/api/test">/api/test</a><br>
    - <a href="/api/health">/api/health</a><br>
    - <a href="/api/ping">/api/ping</a><br>
    - <a href="/api/error">/api/error</a><br>
    - <a href="/api/finance">/api/finance</a><br>
    - <a href="/api/headers">/api/headers</a><br><br>
    <b>Ed Carlos • API • Cequence Study</b>
  `);
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
      { nome: 'João da Silva', idade: 45, diagnostico: 'Hipertensão', plano: 'Saúde Premium' },
      { nome: 'Maria Oliveira', idade: 32, diagnostico: 'Diabetes tipo 2', plano: 'Saúde Básico' },
      { nome: 'Pedro Santos', idade: 60, diagnostico: 'Cardiopatia', plano: 'Saúde Ouro' }
    ],
    medicos: [
      { nome: 'Dr. Carlos Almeida', especialidade: 'Cardiologia' },
      { nome: 'Dra. Fernanda Costa', especialidade: 'Endocrinologia' }
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
      { titular: 'Carlos Souza', saldo: 1500.75, moeda: 'BRL', tipo: 'Corrente' },
      { titular: 'Ana Pereira', saldo: 3200.00, moeda: 'BRL', tipo: 'Poupança' },
      { titular: 'José Lima', saldo: 850.50, moeda: 'USD', tipo: 'Investimento' }
    ],
    transacoesRecentes: [
      { tipo: 'Depósito', valor: 500.00, data: '2026-10-10', origem: 'Caixa Eletrônico' },
      { tipo: 'Transferência', valor: 200.00, data: '2026-10-11', destino: 'Conta Ana Pereira' },
      { tipo: 'Pagamento', valor: 150.00, data: '2026-10-12', descricao: 'Conta de Luz' }
    ]
  });
});

// rota de cabeçalhos
app.get('/api/headers', (req, res) => {
  res.json({
    headersRecebidos: req.headers,
    ipCliente: req.ip
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
