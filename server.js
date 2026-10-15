
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Teste Cequence</title>
</head>
<body>
  <button id="enviar">Enviar</button>
  <p id="resultado">Aguardando envio...</p>

  <script>
    const API_URL =
      "https://edge.datacequencelab.dpdns.org/anything";

    document.getElementById("enviar").onclick = async () => {
      const resultado = document.getElementById("resultado");
      resultado.textContent = "Enviando requisição...";

      try {
        const resposta = await fetch(API_URL);
        resultado.textContent =
          "Resposta recebida. Status: " + resposta.status;
      } catch (erro) {
        resultado.textContent =
          "Falha na requisição. Verifique o Console (F12).";
        console.error(erro);
      }
    };
  </script>
</body>
</html>
