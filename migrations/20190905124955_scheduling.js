exports.up = function(knex, Promise) {
  return knex.schema.createTable('scheduling', table => {
    table.increments('id').primary()
    table
      .string('name')
      .notNullable()
      .defaultTo('')
    table
      .string('email')
      .notNullable()
      .defaultTo('')
    table.string('phone').defaultTo('')
    table.date('createdIn').notNullable()
    table
      .string('ownerName')
      .notNullable()
      .defaultTo('')
    table
      .string('event')
      .notNullable()
      .defaultTo('')
    table.date('eventDate').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('scheduling')
}
