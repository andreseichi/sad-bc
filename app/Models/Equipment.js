'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equipment extends Model {
  events() {
    return this.belongsTo('App/Models/Events')
  }
}

module.exports = Equipment
