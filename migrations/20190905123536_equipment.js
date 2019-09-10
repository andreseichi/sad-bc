exports.up = function(knex, Promise) {
  return knex.schema.createTable('equipment', table => {
    table.increments('id').primary()
    table.string('name').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('equipment')
}
