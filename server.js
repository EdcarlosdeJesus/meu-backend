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

    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #1e90ff, #8a2be2);
        color: white;
        text-align: center;
        padding: 30px;
      }

      a {
        color: #00BFFF;
        font-weight: bold;
        text-decoration: none;
      }

      a:hover {
        color: #87CEFA;
        text-decoration: underline;
      }

      h1 {
        font-size: 3em;
      }

      h2 {
        margin-top: 30px;
        color: #FFD700;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        padding: 6px;
      }

      .get {
        color: #00FF88;
        font-weight: bold;
      }

      .post {
        color: #FFD700;
        font-weight: bold;
      }

      .put {
        color: #FF66FF;
        font-weight: bold;
      }

      .patch {
        color: #FF9966;
        font-weight: bold;
      }

      .delete {
        color: #FF4444;
        font-weight: bold;
      }

      .card {
        background: rgba(255,255,255,0.08);
        border-radius: 15px;
        padding: 20px;
        margin: 20px auto;
        width: 80%;
      }

      hr {
        margin: 20px 0;
      }
    </style>

  </head>

  <body>

    <marquee behavior="alternate" scrollamount="10">
      🚀 API • Estudo Cequence • Discovery • Inventory • Threat Protection 🚀
    </marquee>

    <h1>➡️ API Cequence Study ⬅️</h1>

    <div class="card">

      <h2>📘 API ORIGINAL</h2>

      <ul>

        <li><span class="get">GET</span> - Teste básico -
          <a href="/api/test">/api/test</a>
        </li>

        <li><span class="get">GET</span> - Dados médicos fictícios -
          <a href="/api/health">/api/health</a>
        </li>

        <li><span class="get">GET</span> - Teste de disponibilidade -
          <a href="/api/ping">/api/ping</a>
        </li>

        <li><span class="get">GET</span> - Erro HTTP 500 controlado -
          <a href="/api/error">/api/error</a>
        </li>

        <li><span class="get">GET</span> - Dados financeiros -
          <a href="/api/finance">/api/finance</a>
        </li>

        <li><span class="get">GET</span> - Headers da requisição -
          <a href="/api/headers">/api/headers</a>
        </li>

      </ul>

      <hr>

      <h2>🌐 HTTPBIN CLONE</h2>

      <ul>

        <li><span class="get">GET</span> -
          Query String e Headers -
          <a href="/get">/get</a>
        </li>

        <li><span class="get">GET</span> -
          Headers recebidos -
          <a href="/headers">/headers</a>
        </li>

        <li><span class="get">GET</span> -
          Endereço IP -
          <a href="/ip">/ip</a>
        </li>

        <li><span class="get">GET</span> -
          User Agent -
          <a href="/user-agent">/user-agent</a>
        </li>

        <li><span class="get">GET</span> -
          UUID Aleatório -
          <a href="/uuid">/uuid</a>
        </li>

        <li><span class="get">GET</span> -
          Simulação de Status HTTP -
          <a href="/status/200">/status/200</a>
        </li>

        <li><span class="get">GET</span> -
          JSON de treinamento -
          <a href="/json">/json</a>
        </li>

        <li>
          <span class="get">GET</span>
          <span class="post">POST</span>
          <span class="put">PUT</span>
          <span class="patch">PATCH</span>
          <span class="delete">DELETE</span>
          -
          Captura qualquer payload -
          <a href="/anything">/anything</a>
        </li>

      </ul>

      <hr>

      <h2>🔐 SENSITIVE DATA TESTS</h2>

      <ul>

        <li>
          <span class="post">POST</span>
          Cadastro de Cliente (CPF, Email, Telefone)
          <br>
          Endpoint:
          <b>/api/customer</b>
        </li>

        <li>
          <span class="post">POST</span>
          Login e Autenticação
          <br>
          Endpoint:
          <b>/api/login</b>
        </li>

        <li>
          <span class="post">POST</span>
          Dados Financeiros e Cartões
          <br>
          Endpoint:
          <b>/api/payment</b>
        </li>

        <li>
          <span class="post">POST</span>
          Cadastro de Funcionários
          <br>
          Endpoint:
          <b>/api/employee</b>
        </li>

      </ul>

    </div>

    <footer>
     🧑🏻‍💻 Projeto de Estudo Cequence • Criado por Ed Carlos 🧑🏻‍💻
    </footer>

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
