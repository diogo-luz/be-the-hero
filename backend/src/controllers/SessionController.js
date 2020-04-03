//importamos o connection que criámos na pasta db para conseguir fazer as operacoes com a db
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        // a única responsabilidade disto é verificar se o ong_id existe porque não temos palavras passe
        
        const { id } = request.body;

        const ong = await connection('ongs')
            .select('name')
            .where('id', id)
            .first(); //só retorna uma unica então usamos o first para nos retornar apenas um resultado e não um array
        
        //se a ong não existir
        if (!ong){
            return response.status(400).json({ error: 'No ONG found with this ID' }); //status code http bad request --> 400
        }

        return response.json(ong);
    }
}