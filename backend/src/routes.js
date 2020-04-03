const express = require ('express');

//importar o OngController js que criámos
const OngController = require('./controllers/OngController');
//importar o IncidentController js que criámos
const IncidentController = require('./controllers/IncidentController');
//importar o ProfileController js que criámos
const ProfileController = require('./controllers/ProfileController');
//importar o SessionController js que criámos
const SessionController = require('./controllers/SessionController');

//vamos tirar o modulo de rotas do express para uma nova variável
const routes = express.Router();

//login
routes.post('/sessions', SessionController.create);

//listagem de ongs
routes.get('/ongs', OngController.index);
//registo de ongs
routes.post('/ongs', OngController.create);

//listagem de incidentes
routes.get('/incidents', IncidentController.index);
//registo de incidente
routes.post('/incidents', IncidentController.create);
//apagar um incidente e enviamos um route param
routes.delete('/incidents/:id', IncidentController.delete);

//listagem de incidentes de uma ong no seu perfil
routes.get('/profile', ProfileController.index);

module.exports = routes;