const Produto = require("../models/produto");

exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, quantidade, foto } = req.body;

    if (!nome || !descricao || !quantidade) {
        return res.status(400).json({ error: 'Os campos nome, descricao e quantidade são obrigatórios.' });
      }

      const novoProduto = await Produto.create({ nome, descricao, quantidade, foto });

    return res.status(201).json(novoProduto); 
  } catch (error) {
    return res.status(500).json({ error: error.message }); 
  }
};
    
exports.getAllProdutos = async (req, res) => {
    try {
      const produtos = await Produto.find(); 
      return res.json(produtos); 
    } catch (error) {
      return res.status(500).json({ error: error.message }); 
    }
  };


exports.updateProduto = async (req, res) => {
    try {
      const { id } = req.params; 
      const { nome, descricao, quantidade } = req.body; 
  
      
      if (!nome && !descricao && !quantidade && !foto) {
        return res.status(400).json({ error: 'Envie ao menos um campo para atualização (nome, descricao ou quantidade).' });
      }
  
      
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        id, // ID do produto
        { nome, descricao, quantidade, foto }, 
        { new: true, runValidators: true } 
      );
  
      
      if (!produtoAtualizado) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
  
      
      return res.json(produtoAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message }); 
    }
  };
  

exports.deleteProduto = async (req, res) => {
  const { id } = req.body;

  try {
    const produtoDeletado = await Produto.findByIdAndDelete(id);

    if (!produtoDeletado) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

    return res.status(200).json({
      status: "Success",
      message: "Produto deletado com sucesso",
      data: produtoDeletado,
    });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: err.message || "Erro desconhecido",
    });
  }
};