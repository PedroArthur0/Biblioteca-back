const mongooseToSwagger = require('mongoose-to-swagger');
const EsquemaLivro = require('../src/models/livro.js');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
});

let outputFile = './swagger_output.json';
let endpointsFiles = ['../index.js', '../src/routes.js'];


if(String(process.env.OS).toLocaleLowerCase().includes("windows")){
    outputFile = './swagger/swagger_output.json';
    endpointsFiles = ['./index.js', './src/routes.js'];
}


let doc = {
    info: {
        version: "1.0.0",
        title: "API da Biblioteca",
        description: "Documentação da API da biblioteca."
    },
    servers: [
        {
            url: "https://BibliotecaBack.vercel.app/",
            description: "Servidor de produção."
        }, {
            url: "http://localhost:3500/",
            description: "Servidor localhost."
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        schemas: {
            livro: mongooseToSwagger(EsquemaLivro)
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile);
    if (process.env.NODE_ENV !== 'production') {
        require("../index.js");
    }
})
