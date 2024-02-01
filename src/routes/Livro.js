const express = require('express');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const conectarBancoDados = require('../middlewares/conectarBD');
const EsquemaLivro = require('../models/livro.js');
const router = express.Router();


router.post('/criar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    let {  id, titulo, numeroDePaginas, ISBN, editora} = req.body;
     const respostaBD = await EsquemaLivro.create({ id, titulo, numeroDePaginas, ISBN, editora});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro criada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.put('/editar/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    let idLivro = req.params.id;
    let {  id, titulo, numeroDePaginas, ISBN, editora } = req.body;
 
    const livroAtualizada = await EsquemaLivro.updateOne({ _id: idLivro }, {  id, titulo, numeroDePaginas, ISBN, editora });
    if (livroAtualizada?.modifiedCount > 0) {
      const dadosLivro = await EsquemaLivro.findOne({ _id: idLivro });

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro atualizada com sucesso.",
        resposta: dadosLivro
      })
    }
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.get('/obter/Livros', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    // #swagger.description = "Endpoint para obter todas Livros do usuario logado."
     const respostaBD = await EsquemaLivro.find({});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livros listadas na respota com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.get('/obter/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    // #swagger.description = "Endpoint para obter um livro específico por ID."
    const idLivro = req.params.id;

    const livro = await EsquemaLivro.findOne({ _id: idLivro });
    
    if (!livro) {
      res.status(404).json({
        status: "Erro",
        statusMensagem: "Livro não encontrado."
      });
    } else {
      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro encontrado com sucesso.",
        resposta: livro
      });
    }

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});



router.delete('/deletar/:id', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Livro']
    const idLivro = req.params.id;

    const checkLivro = await EsquemaLivro.findOne({ _id: idLivro});
    if (!checkLivro) {
      throw new Error("Livro não encontrada ou pertence a outro usuário");
    }

    const respostaBD = await EsquemaLivro.deleteOne({ _id: idLivro });
    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro deletada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
