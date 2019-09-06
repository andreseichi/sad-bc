exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('equipment')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('equipment').insert([
        { id: 1, name: 'Notebook' },
        { id: 2, name: 'Datashow' },
        { id: 3, name: 'Quadro interativo' }
      ])
    })
}
