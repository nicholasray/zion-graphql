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
            name: faker.lorem.words(2),
            description: faker.lorem.words(2),
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
            const promises = [];

            promises.push(knex('images').insert({
              trip_id: id[0],
              filename: getFilenames()[0],
            }));

            promises.push(knex('images').insert({
              trip_id: id[0],
              filename: getFilenames()[0],
            }));

            return Promise.all(promises);
          })
        );
      }

      return Promise.all(promises);
    });
};

function getFilenames() {
  const l = [
    "IMG_3162",
    "IMG_3183",
    "IMG_3193",
    "IMG_3196",
    "IMG_3215",
    "IMG_3293",
    "IMG_3411",
    "IMG_3412",
    "IMG_3486"
  ]

  shuffle(l);

  return l;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
