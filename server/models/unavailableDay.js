const { bookshelf } = require('../db')
const Admin = require('./admin')

module.exports = bookshelf.Model.extend({
  tableName: 'unavailableDay',
  admin: () => {
    return this.belongsTo(Admin)
  }
})
