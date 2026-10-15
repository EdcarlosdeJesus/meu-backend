
const express = require('express');
const crypto = require('crypto');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// Endereco publico de entrada da Cequence.
// As chamadas do painel passam por este endereco.
const CEQUENCE_BASE_URL = 'https://api.datacequencelab.dpdns.org';

// ==================================================
// PAINEL HTTPBIN
// ==================================================

app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HTTPBin - Cequence Lab</title>

<style>
:root {
  --background: #071329;
  --panel: #0c1c38;
  --border: #1c5b9b;
  --blue: #087cf5;
  --text: #edf5ff;
  --muted: #9fc4f5;
  --input: #08172e;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: linear-gradient(135deg, #08172f, #061126);
  color: var(--text);
  font: 14px Arial, Helvetica, sans-serif;
}

main {
  width: min(1500px, 100%);
  margin: auto;
  padding: 24px 28px;
}

header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
}

.logo {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: #124b91;
  color: #35d1ff;
  font-size: 30px;
  font-weight: bold;
}

h1 {
  margin: 0 0 5px;
  font-size: clamp(24px, 3vw, 38px);
  letter-spacing: -1px;
}

h1 span { color: #168cff; }

.subtitle {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

.panel {
  margin-bottom: 18px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: linear-gradient(140deg, #0c203f, #091a34);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 20px;
  font-size: 19px;
}

.panel-icon {
  color: #29c9ff;
  font-size: 23px;
}

.form-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.2fr 1.2fr;
  gap: 20px;
  align-items: start;
}

.field { min-width: 0; }

label {
  display: block;
  margin-bottom: 7px;
  color: #e3efff;
  font-weight: 600;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #245b92;
  border-radius: 8px;
  outline: none;
  background: var(--input);
  color: white;
  font: 14px Arial, sans-serif;
}

input:focus, select:focus, textarea:focus {
  border-color: #20a6ff;
  box-shadow: 0 0 0 2px #168cff22;
}

select { cursor: pointer; }

textarea {
  resize: vertical;
  min-height: 130px;
  font-family: Consolas, Monaco, monospace;
  line-height: 1.5;
}

.headers-field {
  grid-column: 1 / 3;
}

.body-field {
  grid-column: 3;
  grid-row: 1 / 3;
}

.headers-field textarea { min-height: 80px; }
.body-field textarea { min-height: 130px; }

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

button {
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid #1767ad;
  border-radius: 8px;
  background: #10294b;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #174373;
  border-color: #37baff;
}

button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.send-button {
  min-width: 238px;
  background: linear-gradient(90deg, #087cf5, #0874eb);
}

.send-button:hover { background: #168cff; }

.endpoint-button { flex: 1 1 125px; }

.endpoint-icon {
  margin-right: 8px;
  color: #36c8ff;
}

.response-box {
  margin-top: 18px;
  padding: 14px;
  border: 1px solid #18538b;
  border-radius: 9px;
  background: #091a34;
}

.response-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.response-heading h3 {
  margin: 0;
  font-size: 18px;
}

.response-heading button {
  min-height: 32px;
  padding: 5px 10px;
}

#status {
  margin: 10px 0;
  color: var(--muted);
  overflow-wrap: anywhere;
}

#result {
  min-height: 105px;
  max-height: 480px;
  overflow: auto;
  margin: 0;
  padding: 16px;
  border: 1px solid #1b4779;
  border-radius: 8px;
  background: #06142a;
  color: #9fc5ff;
  font: 13px/1.6 Consolas, Monaco, monospace;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.routes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.route-row {
  display: grid;
  grid-template-columns: 76px minmax(100px, .65fr) minmax(150px, 1.5fr);
  align-items: center;
  gap: 12px;
  min-height: 40px;
  padding: 5px 0;
  border-bottom: 1px solid #183456;
}

.method-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  min-height: 29px;
  padding: 5px 8px;
  border-radius: 8px;
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.get { background: #00d69a; color: #06291e; }
.post { background: #087cf5; }
.put { background: #7924e9; }
.patch { background: #ff9c13; color: #241500; }
.delete { background: #f32748; }
.all { background: #203b65; border: 1px solid #7699ca; }

.route-path {
  color: #e8f2ff;
  font-family: Consolas, Monaco, monospace;
  font-weight: bold;
  overflow-wrap: anywhere;
}

.route-description {
  color: #a5c9f6;
  font-size: 12px;
  line-height: 1.4;
}

.footer {
  padding: 5px 0 10px;
  color: #7397c3;
  text-align: center;
  font-size: 12px;
}

@media (max-width: 900px) {
  main { padding: 18px; }
  .form-grid { grid-template-columns: 1fr 1fr; }
  .body-field { grid-column: 2; grid-row: 1 / 3; }
  .headers-field { grid-column: 1; }
  .routes-grid { grid-template-columns: 1fr; gap: 0; }
}

@media (max-width: 600px) {
  main { padding: 12px; }
  header { align-items: flex-start; gap: 12px; }
  .logo { width: 44px; height: 44px; font-size: 23px; }
  .panel { padding: 14px; }
  .form-grid { grid-template-columns: 1fr; }
  .body-field, .headers-field { grid-column: 1; grid-row: auto; }
  .send-button { width: 100%; }
  .endpoint-button { flex: 1 1 40%; }
  .route-row { grid-template-columns: 65px 100px minmax(80px, 1fr); gap: 8px; }
  .method-badge { width: 62px; }
}
</style>
</head>

<body>
<main>
<header>
  <div class="logo">&lt;/&gt;</div>
  <div>
    <h1>HTTPBin <span>- Cequence Lab</span></h1>
    <p class="subtitle">
      Laboratório para testar métodos HTTP, cabeçalhos, parâmetros,
      respostas e corpos de requisição.
    </p>
  </div>
</header>

<section class="panel">
  <h2 class="panel-title">
    <span class="panel-icon">▣</span>
    Testador de requisições
  </h2>

  <div class="form-grid">
    <div class="field">
      <label for="method">Método HTTP</label>
      <select id="method">
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>
    </div>

    <div class="field">
      <label for="path">Caminho da rota</label>
      <input id="path" value="/get" placeholder="/get">
    </div>

    <div class="field body-field">
      <label for="body">Corpo JSON</label>
      <textarea id="body">{
  "message": "Cequence API test",
  "value": 123
}</textarea>
    </div>

    <div class="field headers-field">
      <label for="headers">Cabeçalhos adicionais (JSON)</label>
      <textarea id="headers">{
  "Content-Type": "application/json",
  "X-Lab-Test": "cequence"
}</textarea>
    </div>
  </div>

  <div class="actions">
    <button id="send" class="send-button">➤ &nbsp; Enviar requisição</button>
    <button class="endpoint-button" data-path="/status/200">↗ /status/200</button>
    <button class="endpoint-button" data-path="/headers">⊙ /headers</button>
    <button class="endpoint-button" data-path="/ip">● /ip</button>
    <button class="endpoint-button" data-path="/user-agent">♙ /user-agent</button>
    <button class="endpoint-button" data-path="/uuid">⬡ /uuid</button>
    <button class="endpoint-button" data-path="/json">{ } /json</button>
  </div>

  <div class="response-box">
    <div class="response-heading">
      <h3><span class="panel-icon">▣</span> &nbsp; Resposta</h3>
      <button id="copy" title="Copiar resposta">▢</button>
    </div>
    <p id="status" role="status">Aguardando requisição.</p>
    <pre id="result">A resposta aparecerá aqui.</pre>
  </div>
</section>

<section class="panel">
  <h2 class="panel-title">
    <span class="panel-icon">☷</span>
    Rotas HTTPBin disponíveis
  </h2>

  <div class="routes-grid">
    <div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/get</span><span class="route-description">Consulta parâmetros e cabeçalhos</span></div>
      <div class="route-row"><span class="method-badge post">POST</span><span class="route-path">/post</span><span class="route-description">Testa envio de dados</span></div>
      <div class="route-row"><span class="method-badge put">PUT</span><span class="route-path">/put</span><span class="route-description">Testa atualização por PUT</span></div>
      <div class="route-row"><span class="method-badge patch">PATCH</span><span class="route-path">/patch</span><span class="route-description">Testa atualização parcial</span></div>
      <div class="route-row"><span class="method-badge delete">DELETE</span><span class="route-path">/delete</span><span class="route-description">Testa requisições DELETE</span></div>
      <div class="route-row"><span class="method-badge all">ALL</span><span class="route-path">/anything</span><span class="route-description">Aceita qualquer método HTTP</span></div>
    </div>

    <div>
      <div class="route-row"><span class="method-badge all">ALL</span><span class="route-path">/status/:code</span><span class="route-description">Retorna o código HTTP informado</span></div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/headers</span><span class="route-description">Exibe os cabeçalhos recebidos</span></div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/ip</span><span class="route-description">Informa o IP observado pelo servidor</span></div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/user-agent</span><span class="route-description">Exibe o User-Agent</span></div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/uuid</span><span class="route-description">Gera um UUID</span></div>
      <div class="route-row"><span class="method-badge get">GET</span><span class="route-path">/json</span><span class="route-description">Retorna um exemplo JSON</span></div>
    </div>
  </div>
</section>

<div class="footer">HTTPBin - Cequence Lab · Ambiente de testes de API</div>
</main>

<script>
// O painel chama a entrada da Cequence, nao o backend diretamente.
const CEQUENCE_BASE_URL = 'https://api.datacequencelab.dpdns.org';

const methodEl = document.getElementById('method');
const pathEl = document.getElementById('path');
const bodyEl = document.getElementById('body');
const headersEl = document.getElementById('headers');
const resultEl = document.getElementById('result');
const statusEl = document.getElementById('status');
const sendButton = document.getElementById('send');

async function sendRequest() {
  let headers;
  let body;

  try {
    headers = JSON.parse(headersEl.value || '{}');
    body = JSON.parse(bodyEl.value || '{}');

    if (!headers || Array.isArray(headers) || typeof headers !== 'object') {
      throw new Error('Os cabeçalhos precisam ser um objeto JSON.');
    }
  } catch (error) {
    statusEl.textContent = 'Erro de configuração';
    resultEl.textContent = error.message;
    return;
  }

  const path = pathEl.value.trim();

  if (!path.startsWith('/') || path.startsWith('//')) {
    statusEl.textContent = 'Caminho inválido';
    resultEl.textContent = 'Informe um caminho iniciado por uma única barra /.';
    return;
  }

  const method = methodEl.value;
  const options = {
    method,
    headers: { ...headers }
  };

  if (!['GET', 'HEAD'].includes(method)) {
    options.body = JSON.stringify(body);

    const hasContentType = Object.keys(options.headers)
      .some(key => key.toLowerCase() === 'content-type');

    if (!hasContentType) {
      options.headers['Content-Type'] = 'application/json';
    }
  }

  sendButton.disabled = true;
  statusEl.textContent = 'Enviando requisição pela Cequence...';
  resultEl.textContent = 'Aguardando resposta...';

  try {
    // Importante: o destino e o path sao combinados para passar
    // pela entrada publica da Cequence.
    const targetUrl = new URL(path, CEQUENCE_BASE_URL);
    const response = await fetch(targetUrl.toString(), options);
    const text = await response.text();

    statusEl.textContent = 'HTTP ' + response.status + ' ' + response.statusText;

    try {
      resultEl.textContent = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      resultEl.textContent = text;
    }
  } catch (error) {
    statusEl.textContent = 'Falha na requisição';
    resultEl.textContent =
      error.message +
      '\\n\\nSe aparecer um erro de CORS, verifique a política CORS da entrada da Cequence.';
  } finally {
    sendButton.disabled = false;
  }
}

sendButton.addEventListener('click', sendRequest);

document.querySelectorAll('button[data-path]').forEach(button => {
  button.addEventListener('click', () => {
    pathEl.value = button.dataset.path;
    methodEl.value = 'GET';
    sendRequest();
  });
});

document.getElementById('copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultEl.textContent);
    statusEl.textContent += ' · Resposta copiada';
  } catch {
    statusEl.textContent += ' · Não foi possível copiar automaticamente';
  }
});
</script>
</body>
</html>`);
});

// ==================================================
// ENDPOINTS HTTPBIN NO BACKEND
// ==================================================

function echoRequest(req, res) {
  const body = req.body;

  res.json({
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    args: req.query,
    json: body && Object.keys(body).length ? body : null,
    origin: req.ip,
    timestamp: new Date().toISOString()
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
    return res.status(400).json({
      error: 'Código HTTP inválido. Informe um valor entre 100 e 599.'
    });
  }

  return res.status(code).json({
    status: code,
    method: req.method
  });
});

app.get('/headers', (req, res) => {
  res.json({ headers: req.headers });
});

app.get('/ip', (req, res) => {
  res.json({ origin: req.ip });
});

app.get('/user-agent', (req, res) => {
  res.json({
    'user-agent': req.get('user-agent') || ''
  });
});

app.get('/uuid', (req, res) => {
  res.json({ uuid: crypto.randomUUID() });
});

app.get('/json', (req, res) => {
  res.json({
    slideshow: {
      title: 'HTTPBin Lab',
      slides: [
        { title: 'Teste HTTP', type: 'all' },
        { title: 'Teste API', type: 'all' }
      ]
    }
  });
});

// ==================================================
// ERROS
// ==================================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    method: req.method,
    path: req.originalUrl
  });
});

app.use((err, req, res, next) => {
  console.error('HTTPBin error:', err.message);

  if (res.headersSent) return next(err);

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message
  });
});

// Vercel e execucao local.
if (require.main === module) {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log('HTTPBin Lab rodando na porta ' + port);
  });
}

module.exports = app;
