import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Tags',(table)=>{
        table.uuid('id').primary();
        table.string('tag');
        table.uuid('card_id').references('id').inTable('Cards').onDelete('CASCADE')
        
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Tags');
}

