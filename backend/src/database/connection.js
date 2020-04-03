const knex = require('knex');
const configuration = require('../../knexfile'); //vamos buscar o knexfile dois diretorios acima

const connection = knex(configuration.development);

module.exports = connection;