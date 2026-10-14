const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API - Cequence Study</title>
      </head>
      <body style="font-family: Arial; background: linear-gradient(135deg, #1e90ff, #8a2be2); color: white; text-align: center; padding: 40px;">

        <marquee behavior="alternate" direction="left" scrollamount="10" style="font-size: 2em; color: #ffeb3b;">
          🚀 API • Estudo Cequence 🚀
        </marquee>

        <h1>✨ Bem-vindo ✨</h1>

        <ul style="list-style:none;">
          <li><a href="/api/test">/api/test</a></li>
          <li><a href="/api/health">/api/health</a></li>
          <li><a href="/api/ping">/api/ping</a></li>
          <li><a href="/api/error">/api/error</a></li>
          <li><a href="/api/finance">/api/finance</a></li>
          <li><a href="/api/headers">/api/headers</a></li>

          <hr>

          <li><a href="/get">/get</a></li>
          <li><a href="/headers">/headers</a></li>
          <li><a href="/ip">/ip</a></li>
          <li><a href="/user-agent">/user-agent</a></li>
          <li><a href="/uuid">/uuid</a></li>
          <li><a href="/status/200">/status/200</a></li>
          <li><a href="/json">/json</a></li>
          <li><a href="/anything">/anything</a></li>

          <hr>

          <li><a href="/api/customer">/api/customer</a></li>
          <li><a href="/api/payment">/api/payment</a></li>
          <li><a href="/api/login">/api/login</a></li>
          <li><a href="/api/employee">/api/employee</a></li>
        </ul>

      </body>
    </html>
  `);
});

/* ===========================
   API ORIGINAL
=========================== */

app.get('/api/test', (req, res) => {
  res.json({
    message: 'API funcionando!'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hospital: 'Hospital Fictício Central',
    pacientes: [
      {
        nome: 'João da Silva',
        idade: 45,
        diagnostico: 'Hipertensão'
      },
      {
        nome: 'Maria Oliveira',
        idade: 32,
        diagnostico: 'Diabetes'
      }
    ]
  });
});

app.get('/api/ping', (req, res) => {
  res.json({
    status: 'ok',
    reply: 'pong'
  });
});

app.get('/api/error', (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Erro simulado'
  });
});

app.get('/api/finance', (req, res) => {

  res.json({
    banco: 'Banco Fictício',
    contas: [
      {
        titular: 'Carlos Souza',
        saldo: 1500.75
      },
      {
        titular: 'Ana Pereira',
        saldo: 3200.00
      }
    ]
  });

});

app.get('/api/headers', (req, res) => {

  res.json({
    headersRecebidos: req.headers,
    ipCliente: req.ip
  });

});

/* ===========================
   HTTPBIN CLONE
=========================== */

app.all('/anything', (req, res) => {

  res.status(200).json({
    method: req.method,
    path: req.path,
    host: req.hostname,
    query: req.query,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });

});

app.get('/get', (req, res) => {

  res.status(200).json({
    args: req.query,
    headers: req.headers,
    ip: req.ip
  });

});

app.post('/post', (req, res) => {

  res.status(200).json({
    body: req.body,
    received: true
  });

});

app.put('/put', (req, res) => {

  res.status(200).json({
    body: req.body,
    updated: true
  });

});

app.patch('/patch', (req, res) => {

  res.status(200).json({
    body: req.body,
    patched: true
  });

});

app.delete('/delete', (req, res) => {

  res.status(200).json({
    deleted: true
  });

});

app.get('/headers', (req, res) => {

  res.status(200).json({
    headers: req.headers
  });

});

app.get('/ip', (req, res) => {

  res.status(200).json({
    ip: req.ip
  });

});

app.get('/user-agent', (req, res) => {

  res.status(200).json({
    userAgent: req.headers['user-agent']
  });

});

app.get('/uuid', (req, res) => {

  res.status(200).json({
    uuid: crypto.randomUUID()
  });

});

app.get('/status/:code', (req, res) => {

  const code = parseInt(req.params.code);

  res.status(code).json({
    status: code,
    message: `Status ${code}`
  });

});

app.get('/json', (req, res) => {

  res.status(200).json({
    slideshow: {
      title: 'Cequence Training',
      author: 'Ed Carlos',
      slides: [
        {
          title: 'Discovery'
        },
        {
          title: 'API Inventory'
        }
      ]
    }
  });

});

/* ===========================
   SENSITIVE DATA TESTS
=========================== */

app.post('/api/customer', (req, res) => {

  res.status(200).json({
    success: true,
    customer: req.body
  });

});

app.post('/api/login', (req, res) => {

  const {
    username
  } = req.body;

  res.status(200).json({
    authenticated: true,
    username
  });

});

app.post('/api/payment', (req, res) => {

  res.status(200).json({
    transactionId: crypto.randomUUID(),
    status: 'approved',
    paymentData: req.body
  });

});

app.post('/api/employee', (req, res) => {

  res.status(200).json({
    saved: true,
    employee: req.body
  });

});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
