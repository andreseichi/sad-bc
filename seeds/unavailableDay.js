const seeds = require('./seeds_data/unavailableDay')
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('unavailableDay')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('unavailableDay').insert(seeds)
    })
}
