const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// rota principal personalizada
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Ed Carlos - Estudo Cequence</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1e90ff, #00ced1);
            color: white;
            text-align: center;
            padding: 50px;
          }
          h1 {
            font-size: 3em;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.5em;
          }
          .highlight {
            font-weight: bold;
            color: #ffeb3b;
          }
        </style>
      </head>
      <body>
        <h1>🚀 Bem-vindo à API do Ed Carlos!</h1>
        <p>Este é um <span class="highlight">projeto de estudo</span> com a ferramenta <span class="highlight">Cequence</span>.</p>
        <p>Explore as rotas: <br/>
          <a href="/api/test">/api/test</a> | 
          <a href="/api/health">/api/health</a> | 
          <a href="/api/ping">/api/ping</a> | 
          <a href="/api/error">/api/error</a> | 
          <a href="/api/finance">/api/finance</a> | 
          <a href="/api/headers">/api/headers</a>
        </p>
      </body>
    </html>
  `);
});

// demais rotas continuam iguais...
