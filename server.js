
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Teste Cequence</title>
</head>
<body>
  <button id="enviar">Enviar</button>

  <script>
    document.getElementById("enviar").addEventListener("click", async () => {
      try {
        const resposta = await fetch(
          "https://edge.datacequencelab.dpdns.org/anything"
        );

        console.log("Status:", resposta.status);
        console.log(await resposta.text());
      } catch (erro) {
        console.error("Erro:", erro);
      }
    });
  </script>
</body>
</html>
