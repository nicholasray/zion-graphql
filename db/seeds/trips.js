var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let promises = [];
      for (var i = 0; i < 1000; i++) {
        promises.push(
          knex('trips').returning('id').insert({
            distance: faker.random.number({
              min: 1,
              max: 100
            }),
            description: faker.lorem.sentence(),
            lat: faker.random.number({
              min: 38,
              max: 41,
              precision: .0001
            }),
            lng: faker.random.number({
              min: -109,
              max: -112,
              precision: .0001
            }),
          }).then((id) => {
            return knex('images').insert({
              trip_id: id[0],
              filename: faker.system.fileName(),
            })
          })
        );
      }

      return Promise.all(promises);
    });
};
