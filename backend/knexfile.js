// Update with your config settings.

module.exports = {

  //ambiente de desenvolvimento, no nosso computador local enquanto desenvolvemos o projeto
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  //ambiente de testes, base de dados especial apenas para os testes de integração para que os dados 
  //utilizados nos testes não alterem a base de dados do ambiente de desenvolvimento
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  //ambiente de staging que é de desenvolvimento mas para o cliente testar a aplicação durante o desenvolvimente
  //é um ambiente de produção para a equipa de desenvolvimento, isto é, simula a versão de produção para a equipa de desenvolvimento
  //poder testar a aplicação online
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  //ambiente de produção que é o ambiente em que colocamos a aplicação online para que os utilizadores possam aceder à nossa aplicação
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
