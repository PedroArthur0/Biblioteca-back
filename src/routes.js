function routes(app) {
     app.use('/livro', require('./routes/Livro.js'));
    return;
}

module.exports = routes;