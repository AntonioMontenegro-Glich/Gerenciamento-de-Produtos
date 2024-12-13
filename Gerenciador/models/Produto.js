const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  quantidade: { type: Number, required: true },
  foto: { type: String, required: false },
}, { timestamps: true }); // Aqui é o local correto de configuração de timestamps

module.exports = mongoose.model("Produto", produtoSchema);
