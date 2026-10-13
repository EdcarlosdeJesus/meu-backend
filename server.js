const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// rota principal personalizada com gradiente
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Ed Carlos - Cequence Study</title>
      </head>
      <body style="font-family: Arial; background: linear-gradient(135deg, #1e90ff, #8a2be2); color: white; text-align: center; padding: 40px;">
        <h1 style="font-size: 3em;">🚀 API do Ed Carlos</h1>
        <p style="font-size: 1.5em;">Estudo prático com <b>Cequence</b></p>
        <hr style="margin: 20px 0; border: 1px solid #fff;">
        <p>Explore as rotas:</p>
        <ul style="list-style: none; padding: 0; font-size: 1.2em;">
          <li>🔗 <a href="/api/test" style="color: #ffeb3b;">/api/test</a></li>
          <li>❤️ <a href="/api/health" style="color: #ffeb3b;">/api/health</a></li>
          <li>📡 <a href="/api/ping" style="color: #ffeb3b;">/api/ping</a></li>
          <li>⚠️ <a href="/api/error" style="color: #ffeb3b;">/api/error</a></li>
          <li>💰 <a href="/api/finance" style="color: #ffeb3b;">/api/finance</a></li>
          <li>📑 <a href="/api/headers" style="color: #ffeb3b;">/api/headers</a></li>
        </ul>
        <hr style="margin: 20px 0; border: 1px solid #fff;">
        <footer style="margin-top: 30px; font-size: 1.2em;">
          ✨ Projeto de estudo • <b>Ed Carlos</b> • API • Cequence ✨
        </footer>
      </body>
    </html>
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
