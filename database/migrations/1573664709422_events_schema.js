'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table
        .string('title')
        .notNullable()
        .defaultTo('')
      table
        .string('owner')
        .notNullable()
        .defaultTo('')
      table.datetime('start', { presicion: 6 }).notNullable()
      table.datetime('end', { presicion: 6 }).notNullable()
      table.string('description').defaultTo('')
      table.string('event_name').notNullable()
      //verificar como funciona o relacionamento
      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventsSchema
