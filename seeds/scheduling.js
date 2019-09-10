const seeds = require('./seeds_data/scheduling')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scheduling')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('scheduling').insert(seeds)
    })
}
