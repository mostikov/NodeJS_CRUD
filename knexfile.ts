// Update with your config settings.
import dotenv from 'dotenv'
dotenv.config()

export default {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_DEV_HOST,
      user : process.env.DB_DEV_USER,
      password : process.env.DB_DEV_PASSWORD,
      database : process.env.DB_DEV
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
