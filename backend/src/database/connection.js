const knex = require('knex');
const configuration = require('../../knexfile'); //vamos buscar o knexfile dois diretorios acima

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);

module.exports = connection;