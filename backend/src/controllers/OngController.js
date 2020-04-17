const generateUniqueId = require('../utils/generateUniqueId');
//importamos o connection que criámos na pasta db para conseguir fazer as operacoes com a db
const connection = require('../database/connection');

module.exports =  {
    async index(request,response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        //vai gerar 4 bytes de caracteres hexadecimais para o id
        const id = generateUniqueId();

        /**
         * esta inserção vai demorar um pouco, entao para que a response
         * so saia depois do insert ter finalizado tornamos esta função async
         * e antes do insert um await, então quando o node chegar a esta parte de 
         * código vai aguardar para que este finalize
         * */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //só vamos retornar como resposta o id porque vai ser o que a ong vai
        //necessitar para entrar na aplicação
        return response.json({ id });
    }
};