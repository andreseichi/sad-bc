exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scheduling')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('scheduling').insert([
        {
          id: 1,
          name: 'José Barros Sousa',
          email: 'JoseBarrosSousa@armyspy.com',
          phone: '(33) 3324-5200',
          createdIn: '08-08-2019',
          ownerName: 'José Barros Sousa',
          event: 'Palestra de normalização',
          eventDate: '30-09-2019'
        },
        {
          id: 2,
          name: 'Luan Alves Costa',
          email: 'LuanAlvesCosta@rhyta.com',
          phone: '(61) 8697-2055',
          createdIn: '08-08-2019',
          ownerName: 'Luan Alves Costa',
          event: 'Allied City Stores',
          eventDate: '10-10-2019'
        },
        {
          id: 3,
          name: 'Julia Correia Cavalcanti',
          email: 'JuliaCorreiaCavalcanti@armyspy.com',
          phone: '(41) 3190-9721',
          createdIn: '11-08-2019',
          ownerName: 'Julia Correia Cavalcanti',
          event: 'The Warner Brothers Store',
          eventDate: '12-09-2019'
        },
        {
          id: 4,
          name: 'Thaís Goncalves Dias',
          email: 'ThaisGoncalvesDias@jourrapide.com',
          phone: '(14) 9130-8689',
          createdIn: '13-08-2019',
          ownerName: 'Thaís Goncalves Dias',
          event: 'Jewel Mart',
          eventDate: '25-09-2019'
        }
      ])
    })
}
