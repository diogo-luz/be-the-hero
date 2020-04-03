//importamos o connection que criámos na pasta db para conseguir fazer as operacoes com a db
const connection = require('../database/connection');

/**
 * dentro de um controller se seguirmos à seria a metodologia do MVC não deveriamos ter mais do que 5 métodos
 * um para listagem, retornar 1 unico item (caso necessário), para criação e o delete
 * 
 * caso hajam duas listagem do mesmo recurso/entidade que são os incidentes neste caso de listar todas
 * e de listar as especificas de uma ong devemos criar um controller novo surge daí o profile controller
 */

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; //vamos buscar o query param page e se ele não existir vamos dar-lhe o padrão de 1, a página 1

        //vamos contar os casos para exibir o total no frontend
        const [count] = await connection('incidents').count();
        //console.log(count);

        //limit limita a 5 e o offset vai pular os registos queremos pular 5 registos por página
        //mas na página 1 temos de pular 0 registos então fazemos page-1*5 entao ele faz de 5 em 5 a começar no 0
        //porque 1-1*5=0 na página 1 mas depois 2-1*5=5 e por aí diante de 5 em 5 e temos o sistema de paginação feito
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        //vamos retornar o count pelos headers da resposta e não pelo corpo, porque o corpo são os dados dos itens
        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        // no header, pelo request.headers vêm dados da autenticação do user, da geolocalização,  basicamente o contexto de onde veio o request
        const ong_id = request.headers.authorization;

        const [id] = await connection.table('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        //temos de ver quem foi a ong para confirmar que quem está a apagar o incidente foi mesmo a ong que o criou e não uma qualquer
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //como sei que só vai retornar 1 registo porque os ids são unicos podemos usar o first

        //se o ong_id do registo for diferente do que está logado na aplicação
        if (incident.ong_id !== ong_id){
            return response.status(401).json( { error: 'Operation not permitted.'}); //status code http não autorizado --> 401
        }

        //se o código passou o teste do if então vamos apagar do banco
        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //status code 204 -- codigo de resposta com sucesso mas que não tem código para retornar

    }
};