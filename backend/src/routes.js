const express = require ('express');
const { celebrate, Segments, Joi } = require('celebrate'); //para as validações das operações

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
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

//listagem de ongs
routes.get('/ongs', OngController.index);

//registo de ongs -- validação tem de vir primeiro(celebrate)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(9).max(9),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);


//listagem de incidentes de uma ong no seu perfil
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//listagem de incidentes
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), //não é obrigatório porque lhe damos o 1 por defeito quando não há nenhum
    })
}), IncidentController.index);

//registo de incidente
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), IncidentController.create);

//apagar um incidente e enviamos um route param
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


module.exports = routes;