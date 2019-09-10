const { bookshelf } = require('../db')
const equipment = require('./equipment')

module.exports = bookshelf.Model.extend({
  tableName: 'scheduling',
  equipment: () => {
    return this.belongsToMany(equipment)
  }
})
