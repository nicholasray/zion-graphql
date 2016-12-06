var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let promises = [];
      for (var i = 0; i < 1000; i++) {
        promises.push(
          knex('trips').returning('id').insert({
            distance: getRandomInt(1, 100),
            description: faker.lorem.sentence(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
