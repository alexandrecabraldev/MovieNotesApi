import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Cards',(table)=>{
        table.uuid('id').primary();
        table.string('title');
        table.integer('rating').unsigned();
        table.check('rating>=0 AND rating<=5')
        table.text('summary')
        table.uuid('user_id').references('id').inTable('Users').onDelete('CASCADE')
        
    
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Cards')
}

