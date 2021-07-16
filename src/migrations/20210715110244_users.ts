import Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', function (table) {
       table.increments('id').primary();
       table.string('first_name', 75).notNullable();
       table.string('last_name', 75).notNullable();
       table.string('email', 75).notNullable();
       table.string('token', 255).notNullable();
       table.string('password', 255).notNullable();
       table.string('nickname', 75).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("users");
}

