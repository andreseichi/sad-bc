exports.up = function(knex) {
  return knex.schema.createTable('equipment_scheduling', table => {
    table.increments('id').primary()
    table
      .integer('equipment_id')
      .unsigned()
      .references('equipment.id')
    table
      .integer('scheduling_id')
      .unsigned()
      .references('scheduling.id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('authors_books')
}
