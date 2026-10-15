const express = require('express');
const crypto = require('crypto');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// Painel para testar requisicoes HTTP.
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HTTPBin - Cequence Lab</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#101827;color:#e8eef8;font:15px Arial,sans-serif}
main{max-width:1000px;margin:auto;padding:24px}
.panel{background:#192538;border:1px solid #30415b;border-radius:12px;padding:18px;margin:18px 0}
p{color:#aebbd0;line-height:1.5}
label{display:block;margin:12px 0 6px;color:#cbd7e8}
input,select,textarea{width:100%;padding:11px;border:1px solid #40516b;border-radius:7px;background:#0e1726;color:#fff}
textarea{min-height:100px;font-family:monospace}
button{padding:10px 14px;margin:8px 6px 0 0;border:0;border-radius:7px;background:#3779e8;color:#fff;cursor:pointer}
button:hover{background:#255fc1}
.quick{background:#30415b}
pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#0b1220;padding:14px;border-radius:8px;min-height:100px}
.small{font-size:13px;color:#9eacc1}
code{color:#9bc1ff}
</style>
</head>
<body>
<main>
<h1>HTTPBin - Cequence Lab</h1>
<p>Laboratorio para testar metodos HTTP, cabecalhos, parametros, respostas e corpos de requisicao.</p>

<section class="panel">
<h2>Testador de requisicoes</h2>

<label for="method">Metodo HTTP</label>
<select id="method">
<option>GET</option>
<option>POST</option>
<option>PUT</option>
<option>PATCH</option>
<option>DELETE</option>
</select>

<label for="path">Caminho da rota</label>
<input id="path" value="/get" placeholder="/get">

<label for="body">Corpo JSON</label>
<textarea id="body">{"message":"Cequence API test","value":123}</textarea>

<label for="headers">Cabecalhos adicionais (JSON)</label>
<textarea id="headers">{"Content-Type":"application/json","X-Lab-Test":"cequence"}</textarea>

<button id="send">Enviar requisicao</button>
<button class="quick" data-path="/get" data-method="GET">GET</button>
<button class="quick" data-path="/post" data-method="POST">POST</button>
<button class="quick" data-path="/put" data-method="PUT">PUT</button>
<button class="quick" data-path="/patch" data-method="PATCH">PATCH</button>
<button class="quick" data-path="/delete" data-method="DELETE">DELETE</button>
<button class="quick" data-path="/anything" data-method="POST">ANYTHING</button>

<h3>Resposta</h3>
<p id="status" class="small">Aguardando requisicao.</p>
<pre id="result">A resposta aparecera aqui.</pre>
</section>

<section class="panel">
<h2>Rotas HTTPBin disponiveis</h2>
<p><code>GET /get</code> - consulta parametros e cabecalhos</p>
<p><code>POST /post</code> - testa envio de dados</p>
<p><code>PUT /put</code> - testa atualizacao por PUT</p>
<p><code>PATCH /patch</code> - testa atualizacao parcial</p>
<p><code>DELETE /delete</code> - testa requisicoes DELETE</p>
<p><code>ALL /anything</code> - aceita qualquer metodo HTTP</p>
<p><code>ALL /status/:code</code> - retorna o codigo HTTP informado</p>
<p><code>GET /headers</code> - exibe os cabecalhos recebidos</p>
<p><code>GET /ip</code> - informa o IP observado pelo servidor</p>
<p><code>GET /user-agent</code> - exibe o User-Agent</p>
<p><code>GET /uuid</code> - gera um UUID</p>
<p><code>GET /json</code> - retorna um exemplo JSON</p>
</section>

<script>
const methodEl = document.getElementById('method');
const pathEl = document.getElementById('path');
const bodyEl = document.getElementById('body');
const headersEl = document.getElementById('headers');
const resultEl = document.getElementById('result');
const statusEl = document.getElementById('status');

async function sendRequest() {
  let headers;
  let body;

  try {
    headers = JSON.parse(headersEl.value || '{}');
    body = JSON.parse(bodyEl.value || '{}');

    if (!headers || Array.isArray(headers) || typeof headers !== 'object') {
      throw new Error('Os cabecalhos precisam ser um objeto JSON.');
    }
  } catch (error) {
    statusEl.textContent = 'Erro de configuracao';
    resultEl.textContent = error.message;
    return;
  }

  const method = methodEl.value;
  const options = { method, headers };

  if (!['GET', 'HEAD'].includes(method)) {
    options.body = JSON.stringify(body);
    if (!Object.keys(headers).some(h => h.toLowerCase() === 'content-type')) {
      headers['Content-Type'] = 'application/json';
    }
  }

  resultEl.textContent = 'Enviando requisicao...';

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

document.getElementById('send').addEventListener('click', sendRequest);

document.querySelectorAll('button[data-path]').forEach(button => {
  button.addEventListener('click', () => {
    pathEl.value = button.dataset.path;
    methodEl.value = button.dataset.method;
    sendRequest();
  });
});
</script>
</main>
</body>
</html>`);
});

// Funcao comum para refletir os detalhes da requisicao.
function echoRequest(req, res) {
  res.json({
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    args: req.query,
    json: req.body && Object.keys(req.body).length ? req.body : null,
    data: typeof req.body === 'string' ? req.body : '',
    origin: req.ip,
    timestamp: new Date().toISOString()
  });
}

// Rotas HTTPBin para cada metodo.
app.get('/get', echoRequest);
app.post('/post', echoRequest);
app.put('/put', echoRequest);
app.patch('/patch', echoRequest);
app.delete('/delete', echoRequest);

// Aceita qualquer metodo nesta rota.
app.all('/anything', echoRequest);

// Resposta com codigo HTTP escolhido.
app.all('/status/:code', (req, res) => {
  const code = Number(req.params.code);

  if (!Number.isInteger(code) || code < 100 || code > 599) {
    return res.status(400).json({
      error: 'Codigo HTTP invalido. Informe um valor entre 100 e 599.'
    });
  }

  return res.status(code).json({
    status: code,
    method: req.method
  });
});

// Utilitarios HTTPBin.
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
      title: 'HTTPBin Lab',
      slides: [
        { title: 'Teste HTTP', type: 'all' },
        { title: 'Teste API', type: 'all' }
      ]
    }
  });
});

// Rota inexistente.
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    method: req.method,
    path: req.originalUrl
  });
});

// Tratamento de erros.
app.use((err, req, res, next) => {
  console.error('HTTPBin error:', err.message);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message
  });
});

// Execucao local e exportacao para o Vercel.
if (require.main === module) {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log('HTTPBin Lab rodando na porta ' + port);
  });
}

module.exports = app;
