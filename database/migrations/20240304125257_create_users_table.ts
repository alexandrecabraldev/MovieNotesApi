import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Users',table=>{
        table.uuid('id').primary().notNullable();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Users');
}

