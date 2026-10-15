app.get('/', (req, res) => {
res.send(`
<!DOCTYPE html>
<html lang="pt-BR">

<head>
<meta charset="UTF-8">
<title>Cequence API Playground</title>

<style>

body{
    font-family: Arial, sans-serif;
    background:#0f172a;
    color:white;
    margin:0;
    padding:20px;
}

.container{
    max-width:1200px;
    margin:auto;
}

h1{
    color:#38bdf8;
}

.card{
    background:#1e293b;
    padding:20px;
    border-radius:10px;
    margin-bottom:20px;
}

label{
    display:block;
    margin-top:10px;
}

input, select, textarea{
    width:100%;
    padding:10px;
    margin-top:5px;
    border-radius:5px;
    border:none;
    box-sizing:border-box;
}

textarea{
    min-height:200px;
    font-family: monospace;
}

button{
    margin-top:15px;
    background:#06b6d4;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:5px;
    cursor:pointer;
}

button:hover{
    background:#0891b2;
}

pre{
    background:#020617;
    color:#22c55e;
    padding:15px;
    border-radius:5px;
    overflow:auto;
}

.headers-grid{
    display:grid;
    grid-template-columns:1fr 2fr;
    gap:10px;
}

</style>

</head>

<body>

<div class="container">

<h1>🚀 Cequence API Playground</h1>

<div class="card">

<label>Método HTTP</label>

<select id="method">
  <option>GET</option>
  <option>POST</option>
  <option>PUT</option>
  <option>DELETE</option>
</select>

<label>Endpoint</label>

<input
id="url"
value="/anything"
/>

<h3>Headers</h3>

<div class="headers-grid">

<input id="h1n" value="True-Client-IP">
<input id="h1v" placeholder="203.0.113.10">

<input id="h2n" value="X-Forwarded-For">
<input id="h2v" placeholder="198.51.100.10">

<input id="h3n" value="X-Real-IP">
<input id="h3v" placeholder="192.0.2.10">

<input id="h4n" value="Authorization">
<input id="h4v" placeholder="Bearer test">

</div>

<label>Body JSON</label>

<textarea id="body">
{
  "nome":"Ed Carlos",
  "cpf":"12345678909",
  "email":"ed@teste.com"
}
</textarea>

<button onclick="sendRequest()">
Enviar Requisição
</button>

</div>

<div class="card">

<h2>Resposta</h2>

<pre id="response">
Aguardando requisição...
</pre>

</div>

</div>

<script>

async function sendRequest(){

    const method =
        document.getElementById('method').value;

    const url =
        document.getElementById('url').value;

    const bodyText =
        document.getElementById('body').value;

    const headers = {};

    const headerPairs = [
        ['h1n','h1v'],
        ['h2n','h2v'],
        ['h3n','h3v'],
        ['h4n','h4v']
    ];

    headerPairs.forEach(pair => {

        const name =
            document.getElementById(pair[0]).value.trim();

        const value =
            document.getElementById(pair[1]).value.trim();

        if(name && value){
            headers[name] = value;
        }

    });

    headers["Content-Type"] = "application/json";

    const options = {
        method,
        headers
    };

    if(method !== 'GET'){
        options.body = bodyText;
    }

    try {

        const response =
            await fetch(url, options);

        const text =
            await response.text();

        try {

            const json = JSON.parse(text);

            document.getElementById('response').textContent =
                JSON.stringify(json, null, 2);

        }
        catch(err){

            document.getElementById('response').textContent =
                text;

        }

    }
    catch(error){

        document.getElementById('response').textContent =
            error.toString();

    }

}

</script>

</body>
</html>
`);
});
