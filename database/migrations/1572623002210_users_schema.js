'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments('email').notNullable().unique()
      table.string('name').notNullable()
      table.string('surname')
      table.date('birthday', { precision: 6 })
      table.string('password').notNullable()
      table.enum('gender', ['female', 'male', 'other'])
      table.enum('role', [
        'admin',
        'member',
        'event-mananger'
      ]).notNullable().defaultTo('event-mananger')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UsersSchema
