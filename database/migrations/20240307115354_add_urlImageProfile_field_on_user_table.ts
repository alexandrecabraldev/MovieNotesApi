import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('Users',(table)=>{
        table.string('profileImageUrl').defaultTo('/assets/default/AvatarDefault.png')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('Users',(table)=>{
        table.dropColumn('profileImageUrl');
    })
}

