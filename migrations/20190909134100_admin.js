exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', table => {
    table.increments('id').primary()
    table
      .string('name')
      .notNullable()
      .defaultTo('Admin')
    table.string('email').notNullable()
    table
      .boolean('active')
      .notNullable()
      .defaultTo(true)
    table.string('password_digest').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin')
}
