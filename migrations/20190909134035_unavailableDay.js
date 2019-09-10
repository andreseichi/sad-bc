exports.up = function(knex, Promise) {
  return knex.schema.createTable('unavailableDay', table => {
    table.increments('id').primary()
    table.date('day').notNullable()
    table.date('createdIn').notNullable()
    table
      .integer('admin_id')
      .unsigned()
      .references('admin.id')
    table.string('beginIn').notNullable()
    table.string('endIn').notNullable()
  })
}
exports.down = function(knex) {
  return knex.schema.dropTable('unavailableDay')
}
