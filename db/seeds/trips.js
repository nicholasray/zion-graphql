var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let promises = [];
      for (var i = 0; i < 1000; i++) {
        var name = faker.lorem.words(3);
        promises.push(
          knex('trips').returning('id').insert({
            distance: faker.random.number({
              min: 1,
              max: 100
            }),
            slug: slugify(name),
            name,
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
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function getFilenames() {
  const l = [
    "DSCF1260.jpg",
    "DSCF1261.jpg",
    "DSCF1263.jpg",
    "DSCF1265.jpg",
    "DSCF1266.jpg",
    "DSCF1270.jpg",
    "DSCF1271.jpg",
    "DSCF1272.jpg",
    "DSCF1273.jpg",
    "DSCF1274.jpg",
    "DSCF1275.jpg",
    "DSCF1276.jpg",
    "DSCF1277.jpg",
    "DSCF1278.jpg",
    "DSCF1280.jpg",
    "DSCF1281.jpg",
    "DSCF1282.jpg",
    "DSCF1284.jpg",
    "DSCF1285.jpg",
    "DSCF1286.jpg",
    "DSCF1287.jpg",
    "DSCF1288.jpg",
    "DSCF1289.jpg",
    "DSCF1290.jpg",
    "DSCF1291.jpg",
    "DSCF1293.jpg",
    "DSCF1294.jpg",
    "DSCF1295.jpg"
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
