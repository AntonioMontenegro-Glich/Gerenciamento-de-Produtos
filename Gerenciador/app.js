const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const produtoRoutes = require("./routes/produtoRoute"); 
require('dotenv').config();


const app = express();


app.use(express.json());
app.use(cors());


const conectarMongoDB = async () => {
  try {
    const uri = process.env.MONGO_SENHA;
    
    if (!uri) {
      console.error('Erro: a variável MONGO_SENHA não está definida no arquivo .env');
      process.exit(1); 
    }

    await mongoose.connect(uri);
    console.log('Conectado ao MongoDB Atlas com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1); 
  }
};
  
  conectarMongoDB(); //Chamando função de conectar ao mongodb

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
