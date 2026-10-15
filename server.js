const express = require('express');
const crypto = require('crypto');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// Dados simulados para testes do laboratorio.
const customers = [
  { id: 1, name: 'Cliente Demo', email: 'cliente@example.com' }
];

const employees = [
  { id: 1, name: 'Funcionario Demo', role: 'analyst' }
];

const payments = [];

function jsonError(res, status, message) {
  return res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
}

function getBody(req) {
  return req.body && typeof req.body === 'object' ? req.body : {};
}

// Pagina principal: painel para testar as rotas.
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cequence API Lab</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#101827;color:#e8eef8;font:15px Arial,sans-serif}
main{max-width:1050px;margin:auto;padding:24px}
h1{margin-bottom:8px}
p{color:#aebbd0;line-height:1.5}
.panel{background:#192538;border:1px solid #30415b;border-radius:12px;padding:18px;margin:18px 0}
label{display:block;margin:12px 0 6px;color:#cbd7e8}
input,select,textarea{width:100%;padding:11px;border:1px solid #40516b;border-radius:7px;background:#0e1726;color:#fff}
textarea{min-height:110px;font-family:monospace}
button{padding:10px 14px;margin:8px 6px 0 0;border:0;border-radius:7px;background:#3779e8;color:#fff;cursor:pointer}
button:hover{background:#255fc1}
.quick{background:#30415b}
pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#0b1220;padding:14px;border-radius:8px;min-height:100px}
.small{font-size:13px;color:#9eacc1}
</style>
</head>
<body>
<main>
<h1>Cequence API Lab</h1>
<p>Ambiente de testes para requisicoes HTTP, autenticacao simulada e APIs de exemplo.</p>

<section class="panel">
<h2>Testador de requisicoes</h2>
<label for="method">Metodo HTTP</label>
<select id="method">
<option>GET</option><option>POST</option><option>PUT</option>
<option>PATCH</option><option>DELETE</option>
</select>

<label for="path">Caminho da API</label>
<input id="path" value="/api/health" placeholder="/api/health">

<label for="body">Corpo JSON</label>
<textarea id="body">{"email":"cliente@example.com","password":"demo123"}</textarea>

<label for="headers">Cabecalhos adicionais (JSON)</label>
<textarea id="headers">{"Content-Type":"application/json"}</textarea>

<button onclick="sendRequest()">Enviar requisicao</button>
<button class="quick" onclick="quick('/api/health','GET')">Health</button>
<button class="quick" onclick="quick('/api/login','POST')">Login</button>
<button class="quick" onclick="quick('/api/customer','GET')">Customer</button>
<button class="quick" onclick="quick('/api/payment','POST')">Payment</button>
<button class="quick" onclick="quick('/get','GET')">HTTPBin GET</button>
<button class="quick" onclick="quick('/anything','POST')">Anything</button>

<h3>Resposta</h3>
<p id="status" class="small">Aguardando requisicao.</p>
<pre id="result">A resposta da API aparecera aqui.</pre>
</section>

<section class="panel">
<h2>Rotas disponiveis</h2>
<p><b>Autenticacao:</b> POST /api/login</p>
<p><b>Clientes:</b> GET, POST /api/customer</p>
<p><b>Pagamentos:</b> GET, POST /api/payment</p>
<p><b>Funcionarios:</b> GET, POST /api/employee</p>
<p><b>HTTP de teste:</b> /get, /post, /put, /patch, /delete, /anything</p>
<p><b>Utilitarios:</b> /status/:code, /headers, /ip, /user-agent, /uuid, /json</p>
<p><b>Rotas originais:</b> /api/test, /api/health, /api/ping, /api/error, /api/finance, /api/headers</p>
</section>
</main>
<script>
const methodEl = document.getElementById('method');
const pathEl = document.getElementById('path');
const bodyEl = document.getElementById('body');
const headersEl = document.getElementById('headers');
const resultEl = document.getElementById('result');
const statusEl = document.getElementById('status');

function quick(path, method) {
  pathEl.value = path;
  methodEl.value = method;
  sendRequest();
}

async function sendRequest() {
  let headers;
  let body;
  try {
    headers = JSON.parse(headersEl.value || '{}');
    body = JSON.parse(bodyEl.value || '{}');
  } catch (error) {
    statusEl.textContent = 'JSON invalido: ' + error.message;
    return;
  }

  const method = methodEl.value;
  const options = { method, headers };

  if (!['GET', 'HEAD'].includes(method)) {
    options.body = JSON.stringify(body);
    if (!headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json';
    }
  }

  resultEl.textContent = 'Enviando...';
  try {
    const response = await fetch(pathEl.value, options);
    const text = await response.text();
    statusEl.textContent = 'HTTP ' + response.status + ' ' + response.statusText;
    try {
      resultEl.textContent = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      resultEl.textContent = text;
    }
  } catch (error) {
    statusEl.textContent = 'Falha na requisicao';
    resultEl.textContent = error.message;
  }
}
</script>
</body>
</html>`);
});

// Rotas basicas e de saude.
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'healthy', service: 'cequence-api-lab' });
});

app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API test endpoint', method: req.method });
});

app.get('/api/headers', (req, res) => {
  res.json({ headers: req.headers });
});

// Login demonstrativo. Nao e autenticacao real.
app.post('/api/login', (req, res) => {
  const { email, password } = getBody(req);

  if (!email || !password) {
    return jsonError(res, 400, 'Informe email e password.');
  }

  if (password === 'wrong' || password === 'invalid') {
    return jsonError(res, 401, 'Credenciais invalidas.');
  }

  res.json({
    success: true,
    message: 'Login simulado com sucesso',
    token: 'demo-' + crypto.randomBytes(12).toString('hex'),
    user: { email }
  });
});

// Clientes simulados.
app.get('/api/customer', (req, res) => {
  const id = Number(req.query.id);
  if (req.query.id) {
    const customer = customers.find(item => item.id === id);
    if (!customer) return jsonError(res, 404, 'Cliente nao encontrado.');
    return res.json({ success: true, customer });
  }
  res.json({ success: true, customers });
});

app.post('/api/customer', (req, res) => {
  const body = getBody(req);
  if (!body.name || !body.email) {
    return jsonError(res, 400, 'Informe name e email.');
  }

  const customer = {
    id: customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1,
    name: String(body.name),
    email: String(body.email)
  };
  customers.push(customer);
  res.status(201).json({ success: true, customer });
});

// Pagamentos simulados: nao movimentam dinheiro.
app.get('/api/payment', (req, res) => {
  res.json({ success: true, payments });
});

app.post('/api/payment', (req, res) => {
  const body = getBody(req);
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return jsonError(res, 400, 'amount deve ser um numero maior que zero.');
  }

  const payment = {
    id: payments.length + 1,
    amount,
    currency: body.currency || 'BRL',
    status: 'simulated',
    createdAt: new Date().toISOString()
  };

  payments.push(payment);
  res.status(201).json({ success: true, payment });
});

// Funcionarios simulados.
app.get('/api/employee', (req, res) => {
  res.json({ success: true, employees });
});

app.post('/api/employee', (req, res) => {
  const body = getBody(req);
  if (!body.name || !body.role) {
    return jsonError(res, 400, 'Informe name e role.');
  }

  const employee = {
    id: employees.length + 1,
    name: String(body.name),
    role: String(body.role)
  };
  employees.push(employee);
  res.status(201).json({ success: true, employee });
});

// Endpoints no estilo HTTPBin para observar requisicoes.
function echoRequest(req, res) {
  res.json({
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    query: req.query,
    body: req.body || {},
    ip: req.ip
  });
}

app.get('/get', echoRequest);
app.post('/post', echoRequest);
app.put('/put', echoRequest);
app.patch('/patch', echoRequest);
app.delete('/delete', echoRequest);
app.all('/anything', echoRequest);

app.all('/status/:code', (req, res) => {
  const code = Number(req.params.code);
  if (!Number.isInteger(code) || code < 100 || code > 599) {
    return jsonError(res, 400, 'Codigo HTTP invalido.');
  }
  res.status(code).json({ status: code, method: req.method });
});

app.get('/headers', (req, res) => {
  res.json({ headers: req.headers });
});

app.get('/ip', (req, res) => {
  res.json({ origin: req.ip });
});

app.get('/user-agent', (req, res) => {
  res.json({ 'user-agent': req.get('user-agent') || '' });
});

app.get('/uuid', (req, res) => {
  res.json({ uuid: crypto.randomUUID() });
});

app.get('/json', (req, res) => {
  res.json({
    slideshow: {
      title: 'API Lab',
      slides: [
        { title: 'First slide', type: 'all' },
        { title: 'Second slide', type: 'all' }
      ]
    }
  });
});

// Rotas para testes de erros e dados ficticios.
app.get('/api/error', (req, res) => {
  jsonError(res, 500, 'Erro simulado para testes.');
});

app.get('/api/finance', (req, res) => {
  res.json({
    success: true,
    currency: 'BRL',
    balance: 1250.50,
    note: 'Dados ficticios para laboratorio.'
  });
});

// Resposta para rotas inexistentes.
app.use((req, res) => {
  jsonError(res, 404, 'Rota nao encontrada.');
});

// Tratamento centralizado de erros.
app.use((err, req, res, next) => {
  console.error('API error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Erro interno do servidor.' : err.message
  });
});

// Permite testar localmente e exporta a aplicacao para o Vercel.
if (require.main === module) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log('API Lab rodando na porta ' + port);
  });
}

module.exports = app;
