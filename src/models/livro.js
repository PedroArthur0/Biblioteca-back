const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: 'é obrigatório!',
    },
    titulo: {
      type: String,
      required: 'é obrigatório!',
    },
    numeroDePaginas: {
      type: Number,
      default: '',
    },
    ISBN: {
      type: Number,
      required: 'é obrigatório!',
    },
    editora: {
      type: String,
      required: 'é obrigatório!',
    },
  },
  {
    timestamps: true
  }
);

const EsquemaLivro = mongoose.models.Tarefa || mongoose.model('Livro', esquema);
module.exports = EsquemaLivro;
