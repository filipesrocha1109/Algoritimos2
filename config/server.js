var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var Validator = require('express-validator')
var session = require('express-session')


var app = express();

//aterando a propriedade do express 
app.set('view engine','ejs');
app.set('views', './app/views');

// deixa arquivos publicos visivei em todas camadas da apçicação
// permite que import os memsmo apartir da raiz
app.use(express.static('./app/public'));

app.use(session({
	secret: "user_id",
	resave: true,
	saveUninitialized: true
}));

// pega os retornos e transforma em JSON
app.use(bodyParser.urlencoded({extended:true}));

// middleware  de validação 
app.use(Validator());

// inculsão diretorio routes e conexão do banco para exportação para a aplicação 
consign()
    .include('app/routes')
    .then('config/dbconnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app;