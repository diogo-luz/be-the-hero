const express = require('express');

//require do cors para segurança da bd
const cors = require('cors');

//vamos importar as rotas do routes.js
const routes = require('./routes'); //importante dar o caminho para o programa nao pensar que isto é um pacote

const app = express();

//utilizar o cors, fica vazio porque está em ambiente de desenvolvimento e então assim permite que qualquer frontend pode aceder
//quando for colocado em produção devemos indicar a origin -> qual o endereço que pode aceder ao a esta aplicação
app.use(cors());

//temos de informar o app, o express que vamos utilizar JSON para o corpo/body das requests
app.use(express.json());

//isto tem de ser depois da linha express.json()
app.use(routes);

app.listen(3333);