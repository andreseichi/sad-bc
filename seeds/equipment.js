const seedes = require('./seeds_data/equipment')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('equipment')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('equipment').insert(seeds)
    })
}
