const { bookshelf } = require('../db')
const scheduling = require('./scheduling')

module.exports = bookshelf.Model.extend({
  tableName: 'equipment',
  scheduling: () => {
    return this.belongsToMany(scheduling)
  }
})
