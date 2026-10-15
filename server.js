
const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '100kb' }));

/* =====================================================
   FRONTEND SPA
===================================================== */

app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>API Cequence Study</title>

<style>
:root {
  --bg: #111629;
  --card: #1d2640;
  --border: #394563;
  --text: #edf2ff;
  --muted: #aebbd5;
  --blue: #65adff;
  --green: #42e0a0;
  --yellow: #ffd166;
  --red: #ff7185;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 18px;
  font-family: Arial, sans-serif;
  color: var(--text);
  background: linear-gradient(135deg, #111629, #302052);
}

.container { max-width: 1200px; margin: auto; }

header { text-align: center; padding: 20px 0; }

header h1 { font-size: clamp(26px, 5vw, 42px); }

header p, .hint { color: var(--muted); line-height: 1.6; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 16px;
  min-width: 0;
}

h2 { color: var(--yellow); font-size: 20px; }
h3 { color: var(--blue); }

label {
  display: block;
  margin: 12px 0 6px;
  color: var(--muted);
  font-size: 13px;
}

input, textarea, select {
  width: 100%;
  padding: 11px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: #101629;
  color: var(--text);
  margin-bottom: 8px;
  font: inherit;
}

textarea {
  min-height: 110px;
  font-family: monospace;
  font-size: 13px;
}

button {
  background: var(--blue);
  color: #101629;
  border: 0;
  border-radius: 7px;
  padding: 11px 14px;
  margin-top: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:hover { filter: brightness(1.1); }

.secondary { background: #465371; color: white; }
.danger { background: var(--red); }

.get { color: var(--green); }
.post { color: var(--yellow); }
.put { color: #e1a3ff; }
.patch { color: #ffae83; }
.delete { color: var(--red); }

.endpoint-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.endpoint {
  background: #111629;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
}

.endpoint strong { display: block; margin-bottom: 7px; }
.endpoint small { color: var(--muted); }

.notice {
  border-left: 4px solid var(--yellow);
  padding: 12px;
  background: #282943;
  line-height: 1.6;
}

#resultado {
  background: #090e1b;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  max-height: 400px;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 13px;
  line-height: 1.5;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 12px;
}

footer {
  text-align: center;
  color: var(--muted);
  padding: 25px 0 50px;
}

@media (max-width: 600px) {
  body { padding: 10px; }
  .card { padding: 14px; }
}
</style>
</head>

<body>
<div class="container">

<header>
  <h1>API Cequence Study</h1>
  <p>Laboratório de APIs HTTP, Discovery, Inventory e análise de tráfego</p>
</header>

<div class="card">
  <h2>Sobre o laboratório</h2>
  <div class="notice">
    Ambiente educacional. Utilize somente dados fictícios.
    Os endpoints demonstram tráfego HTTP, mas não implementam
    autenticação, autorização ou processamento financeiro reais.
  </div>
</div>

<h2>Dados sensíveis e autenticação</h2>

<div class="grid">

  <section class="card">
    <h2>Login</h2>
    <form onsubmit="sendForm(event, '/api/login')">
      <label>Username</label>
      <input name="username" value="aluno_teste" required>
      <label>Senha fictícia</label>
      <input name="password" type="password"
        value="senha-ficticia-123" required>
      <button type="submit">Enviar POST</button>
    </form>
  </section>

  <section class="card">
    <h2>Customer</h2>
    <form onsubmit="sendForm(event, '/api/customer')">
      <label>Nome</label>
      <input name="nome" value="Cliente Exemplo" required>
      <label>CPF de teste</label>
      <input name="cpf" value="00000000000">
      <label>Email</label>
      <input name="email" value="cliente@example.com">
      <label>Telefone</label>
      <input name="telefone" value="0000000000">
      <button type="submit">Cadastrar cliente</button>
    </form>
  </section>

  <section class="card">
    <h2>Payment</h2>
    <form onsubmit="sendForm(event, '/api/payment')">
      <label>Nome fictício</label>
      <input name="nome" value="Cliente Exemplo">
      <label>Cartão de teste</label>
      <input name="cartao" value="0000000000000000">
      <label>CVV de teste</label>
      <input name="cvv" value="000">
      <label>Valor</label>
      <input name="valor" type="number" value="100.00" step="0.01">
      <button type="submit">Simular pagamento</button>
    </form>
    <p class="hint">Nenhuma transação financeira é realizada.</p>
  </section>

  <section class="card">
    <h2>Employee</h2>
    <form onsubmit="sendForm(event, '/api/employee')">
      <label>Nome fictício</label>
      <input name="nome" value="Funcionário Exemplo">
      <label>CPF de teste</label>
      <input name="cpf" value="00000000000">
      <label>Cargo</label>
      <input name="cargo" value="Analista de Segurança">
      <label>Salário fictício</label>
      <input name="salario" type="number" value="5000" step="0.01">
      <button type="submit">Cadastrar funcionário</button>
    </form>
  </section>

</div>

<h2>Métodos HTTP</h2>

<div class="grid">

  <section class="card">
    <h2 class="get">GET</h2>
    <form onsubmit="callGet(event)">
      <label>Query String</label>
      <input id="query" value="produto=notebook&id=1">
      <button type="submit">Executar GET</button>
    </form>
  </section>

  <section class="card">
    <h2 class="post">POST</h2>
    <form onsubmit="sendJson(event, '/post', 'POST')">
      <label>Corpo JSON</label>
      <textarea name="payload">{
  "teste": "cequence",
  "tipo": "post"
}</textarea>
      <button type="submit">Executar POST</button>
    </form>
  </section>

  <section class="card">
    <h2 class="put">PUT</h2>
    <form onsubmit="sendJson(event, '/put', 'PUT')">
      <label>Corpo JSON</label>
      <textarea name="payload">{
  "id": 1,
  "nome": "Produto atualizado"
}</textarea>
      <button type="submit">Executar PUT</button>
    </form>
  </section>

  <section class="card">
    <h2 class="patch">PATCH</h2>
    <form onsubmit="sendJson(event, '/patch', 'PATCH')">
      <label>Corpo JSON</label>
      <textarea name="payload">{
  "campo": "novo"
}</textarea>
      <button type="submit">Executar PATCH</button>
    </form>
  </section>

  <section class="card">
    <h2 class="delete">DELETE</h2>
    <p>Envia DELETE para /delete.</p>
    <button class="danger" onclick="callDelete()">Executar DELETE</button>
  </section>

  <section class="card">
    <h2>ANYTHING</h2>
    <label>Método HTTP</label>
    <select id="method">
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>PATCH</option>
      <option>DELETE</option>
    </select>
    <label>Corpo JSON</label>
    <textarea id="anythingBody">{
  "username": "aluno_teste",
  "email": "aluno@example.com"
}</textarea>
    <button onclick="callAnything()">Executar requisição</button>
  </section>

</div>

<h2>Endpoints da API</h2>

<div class="card">
  <div class="endpoint-list">

    <div class="endpoint">
      <strong class="get">GET /api/test</strong>
      <small>Teste básico</small><br>
      <button onclick="callApi('/api/test')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /api/health</strong>
      <small>Dados de saúde fictícios</small><br>
      <button onclick="callApi('/api/health')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /api/ping</strong>
      <small>Disponibilidade</small><br>
      <button onclick="callApi('/api/ping')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /api/error</strong>
      <small>Erro simulado 500</small><br>
      <button onclick="callApi('/api/error')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /api/finance</strong>
      <small>Dados financeiros fictícios</small><br>
      <button onclick="callApi('/api/finance')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /api/headers</strong>
      <small>Headers e IP</small><br>
      <button onclick="callApi('/api/headers')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /headers</strong>
      <small>Headers HTTP</small><br>
      <button onclick="callApi('/headers')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /ip</strong>
      <small>IP observado pelo servidor</small><br>
      <button onclick="callApi('/ip')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /user-agent</strong>
      <small>User-Agent</small><br>
      <button onclick="callApi('/user-agent')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /uuid</strong>
      <small>UUID aleatório</small><br>
      <button onclick="callApi('/uuid')">Executar</button>
    </div>

    <div class="endpoint">
      <strong class="get">GET /json</strong>
      <small>JSON de treinamento</small><br>
      <button onclick="callApi('/json')">Executar</button>
    </div>

  </div>
</div>

<section class="card">
  <h2>Simulador de status HTTP</h2>
  <label>Código HTTP</label>
  <select id="statuscode">
    <option value="200">200 - OK</option>
    <option value="201">201 - Created</option>
    <option value="400">400 - Bad Request</option>
    <option value="401">401 - Unauthorized</option>
    <option value="403">403 - Forbidden</option>
    <option value="404">404 - Not Found</option>
    <option value="429">429 - Too Many Requests</option>
    <option value="500">500 - Internal Server Error</option>
    <option value="503">503 - Service Unavailable</option>
  </select>
  <button onclick="callStatus()">Executar status</button>
</section>

<section class="card">
  <h2>Header personalizado</h2>
  <label>Nome do header</label>
  <input id="headerName" value="X-Lab-Source">
  <label>Valor</label>
  <input id="headerValue" value="cequence-training">
  <button onclick="callCustomHeaders()">Enviar header</button>
</section>

<section class="card">
  <h2>Resultado da requisição</h2>
  <div class="result-meta">
    <span id="resultStatus">Status: aguardando</span>
    <span id="resultTime">Tempo: --</span>
    <span id="resultUrl">Endpoint: --</span>
  </div>
  <pre id="resultado">Execute uma requisição para visualizar o resultado.</pre>
  <button class="secondary" onclick="copyResult()">Copiar resultado</button>
  <button class="secondary" onclick="clearResult()">Limpar</button>
</section>

<footer>
  Laboratório educacional Cequence Study<br>
  Utilize apenas dados fictícios e ambientes autorizados.
</footer>

</div>

<script>
function show(data) {
  document.getElementById('resultado').textContent =
    JSON.stringify(data, null, 2);
}

async function request(url, options = {}) {
  const start = performance.now();

  document.getElementById('resultUrl').textContent =
    'Endpoint: ' + url;
  document.getElementById('resultStatus').textContent =
    'Status: enviando...';

  try {
    const response = await fetch(url, options);
    const elapsed = Math.round(performance.now() - start);
    const contentType = response.headers.get('content-type') || '';

    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    document.getElementById('resultStatus').textContent =
      'Status: ' + response.status + ' ' + response.statusText;
    document.getElementById('resultTime').textContent =
      'Tempo: ' + elapsed + ' ms';

    show({
      httpStatus: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data: data
    });

    return response;
  } catch (error) {
    document.getElementById('resultStatus').textContent =
      'Status: erro de conexão';
    document.getElementById('resultTime').textContent =
      'Tempo: ' + Math.round(performance.now() - start) + ' ms';

    show({
      error: error.message,
      message: 'Verifique a conexão e o servidor.'
    });

    return null;
  }
}

async function callApi(url) {
  return request(url);
}

async function sendForm(event, url) {
  event.preventDefault();

  const form = event.currentTarget;
  const data = {};

  for (const element of form.elements) {
    if (element.name) data[element.name] = element.value;
  }

  await request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function sendJson(event, url, method) {
  event.preventDefault();

  const text = event.currentTarget.querySelector('textarea').value;
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    show({ error: 'JSON inválido. Corrija o corpo antes de enviar.' });
    return;
  }

  await request(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

async function callDelete() {
  await request('/delete', { method: 'DELETE' });
}

async function callAnything() {
  const method = document.getElementById('method').value;
  const bodyText = document.getElementById('anythingBody').value;
  const options = { method: method };

  if (method !== 'GET' && method !== 'DELETE') {
    try {
      options.body = JSON.stringify(JSON.parse(bodyText));
    } catch {
      show({ error: 'JSON inválido. Corrija o corpo antes de enviar.' });
      return;
    }

    options.headers = { 'Content-Type': 'application/json' };
  }

  await request('/anything', options);
}

async function callStatus() {
  const code = document.getElementById('statuscode').value;
  await request('/status/' + encodeURIComponent(code));
}

async function callGet(event) {
  event.preventDefault();

  const query = document.getElementById('query').value.trim();
  const params = new URLSearchParams(query);
  const suffix = params.toString();

  await request('/get' + (suffix ? '?' + suffix : ''));
}

async function callCustomHeaders() {
  const name = document.getElementById('headerName').value.trim();
  const value = document.getElementById('headerValue').value;

  if (!name || !/^[!#$%&'*+.^_\`|~0-9A-Za-z-]+$/.test(name)) {
    show({ error: 'Nome de header inválido.' });
    return;
  }

  const headers = new Headers();
  headers.set(name, value);

  await request('/headers', {
    method: 'GET',
    headers: headers
  });
}

async function copyResult() {
  const text = document.getElementById('resultado').textContent;

  try {
    await navigator.clipboard.writeText(text);
    document.getElementById('resultTime').textContent = 'Copiado!';
  } catch {
    show({ error: 'Cópia automática indisponível. Copie o texto manualmente.' });
  }
}

function clearResult() {
  document.getElementById('resultado').textContent = 'Resultado limpo.';
  document.getElementById('resultStatus').textContent = 'Status: aguardando';
  document.getElementById('resultTime').textContent = 'Tempo: --';
  document.getElementById('resultUrl').textContent = 'Endpoint: --';
}
</script>
</body>
</html>`);
});

/* =====================================================
   API ORIGINAL
===================================================== */

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

/* =====================================================
   HTTPBIN CLONE
===================================================== */

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
  const code = Number(req.params.code);

  // Evita códigos fora da faixa de status HTTP.
  if (!Number.isInteger(code) || code < 100 || code > 599) {
    return res.status(400).json({
      error: 'Código HTTP inválido'
    });
  }

  res.status(code).json({
    status: code,
    message: 'Status ' + code
  });
});

app.get('/json', (req, res) => {
  res.status(200).json({
    slideshow: {
      title: 'Cequence Training',
      author: 'Ed Carlos',
      slides: [
        { title: 'Discovery' },
        { title: 'API Inventory' }
      ]
    }
  });
});

/* =====================================================
   SENSITIVE DATA TESTS
===================================================== */

app.post('/api/customer', (req, res) => {
  res.status(200).json({
    success: true,
    customer: req.body
  });
});

app.post('/api/login', (req, res) => {
  const { username } = req.body;

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

/* =====================================================
   ERROR HANDLING
===================================================== */

// Trata JSON malformado enviado ao backend.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'O corpo da requisição não contém JSO
