const { bookshelf } = require('../db')

module.exports = bookshelf.Model.extend({
  tableName: 'equipment_scheduling'
})
