import Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
      .createTable('posts', function (table) {
         table.increments('id').primary();
         table.integer('owner_id').unsigned().references('id').inTable('users');
         table.text('content').notNullable();
         table.text('title').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("posts")
}

