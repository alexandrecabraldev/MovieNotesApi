// Update with your config settings.

import { Knex } from "knex";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const knexConfig:Knex.Config = {

  client: 'sqlite3',
  connection: {
    filename: './database/database.db'
  },
  migrations:{
    directory:"./database/migrations",
    extension:'ts'
  },
  useNullAsDefault:true
};


export default knexConfig
