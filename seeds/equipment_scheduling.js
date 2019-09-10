const seeds = require('./seeds_data/equipment_scheduling')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('equipment_scheduling')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('equipment_scheduling').insert(seeds)
    })
}
