import knex from "knex"

export const knexConnection = knex({
    client:'sqlite3',
    connection:{
        filename: "./database/database.db"
    },
    migrations:{
        directory:"./database/migrations",
        extension:'ts'
    },
    useNullAsDefault:true
})