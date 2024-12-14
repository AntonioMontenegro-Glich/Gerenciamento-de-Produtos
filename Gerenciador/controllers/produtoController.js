const Produto = require("../models/Produto");
const upload = require("../multerConfig"); 

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find(); 
    res.status(200).json(produtos); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

//const uploadImage = async (imageBuffer) => {
  
  //const imageUrl = "mongodb+srv://antoniolemos2004:7t9Jv8t85I5eiFsJ@estoqueprodutos.jzajy.mongodb.net/?retryWrites=true&w=majority&appName=EstoqueProdutos/imagem-salva.jpg";
  //return imageUrl;
//};

exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, quantidade} = req.body;

    if (!nome || !descricao || !quantidade) {
      return res.status(400).json({ error: 'Os campos nome, descricao e quantidade são obrigatórios.' });
    }

      const foto = req.file ? `/uploads/${req.file.filename}` : null;
  
      console.log('Imagem recebida:', picture);

    const novoProduto = await Produto.create({
      nome,
      descricao,
      quantidade,
      foto, 
    });

    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.updateProduto = async (req, res) => {
    try {
      const { id } = req.params; 
      const { nome, descricao, quantidade, foto } = req.body; 
  
      
      if (!nome && !descricao && !quantidade && !foto) {
        return res.status(400).json({ error: 'Envie ao menos um campo para atualização (nome, descricao , quantidade ou foto).' });
      }
  
      
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        id, // ID do produto
        {
        ...(nome && { nome }),
        ...(descricao && { descricao }),
        ...(quantidade && { quantidade }),
        ...(foto && { foto }),
        },

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
  const { id } = req.params;

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