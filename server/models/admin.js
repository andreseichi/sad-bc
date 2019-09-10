const bookshelf = require('../db')
const UnavailableDay = require('./unavailableDay')

module.exports = bookshelf.Model.extend({
  tableName: 'admin',
  hasSecurePassword: true,
  hidden: 'password_digest',
  unavailableDay: () => {
    return this.hasMany(UnavailableDay)
  }
})
