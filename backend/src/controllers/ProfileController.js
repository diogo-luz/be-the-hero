/**
 * dentro de um controller se seguirmos à seria a metodologia do MVC não deveriamos ter mais do que 5 métodos
 * um para listagem, retornar 1 unico item (caso necessário), para criação e o delete
 * 
 * caso hajam duas listagem do mesmo recurso/entidade que são os incidentes neste caso de listar todas
 * e de listar as especificas de uma ong devemos criar um controller novo surge daí o profile controller
 * 
 * este controller vai ser responsável pelo perfil de uma ONG
 */

const connection = require('../database/connection');

 module.exports = {
     async index(request,response){
         const ong_id = request.headers.authorization;

         const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

         return response.json(incidents);
     }
 }