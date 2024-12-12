const express = require("express");
const mongoose = require("mongoose");
const produtoRoutes = require("./routes/produtoRoute"); 

const app = express();


app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/nome_do_banco", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// Rotas
app.use("/api/produtos", produtoRoutes); 


app.get("/", (req, res) => {
  res.send("API de Produtos funcionando!");
});


app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

const PORT = 3000; // Define a porta do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
