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
            slug: slugify(name) + i,
            map_id: 'DG1G',
            name,
            tagline: faker.lorem.words(7),
            description: getMarkdown(),
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
          }).then((tripId) => {
            const promises = [];

            promises.push(createTripImage(tripId, knex));
            promises.push(createTripImage(tripId, knex));
            promises.push(createCampsiteWithImages(tripId, knex));
            promises.push(createCampsiteWithImages(tripId, knex));
            promises.push(createCampsiteWithImages(tripId, knex));
            promises.push(createCampsite(tripId, knex).then(campsiteId => {
                let promises = [];

                promises.push(createItinerary(tripId, knex).then(itineraryId => {
                  return createItineraryPlans(1, itineraryId, campsiteId, knex);
                }));

                promises.push(createItinerary(tripId, knex).then(itineraryId => {
                  let promises = [];
                  promises.push(createItineraryPlans(1, itineraryId, campsiteId, knex));
                  promises.push(createItineraryPlans(2, itineraryId, campsiteId, knex));

                  return Promise.all(promises);
                }));

                promises.push(createTripCampsite(tripId, campsiteId, knex));
                promises.push(createCampsiteImage(campsiteId, knex));

                return Promise.all(promises);
              })
            );


            return Promise.all(promises);
          })
        );
      }

      return Promise.all(promises);
    });
};


function createTripCampsite(tripId, campsiteId, knex) {
  return knex('trip_campsites').returning('id').insert({
    trip_id: tripId[0],
    campsite_id: campsiteId[0]
  });
}

function createTripImage(tripId, knex) {
  return knex('images').insert({
    trip_id: tripId[0],
    filename: getFilenames()[0],
    caption: faker.lorem.sentence()
  });
}

function createItinerary(tripId, knex) {
  return knex('itineraries').returning('id').insert({
    trip_id: tripId[0],
    start: faker.lorem.word(),
    end: faker.lorem.word()
  });
}

function createItineraryPlans(day, itineraryId, campsiteId, knex) {
  return knex('itinerary_plans').insert({
    itinerary_id: itineraryId[0],
    campsite_id: campsiteId[0],
    day,
    distance: faker.random.number({min: 1, max: 10}),
    elevation_gain: faker.random.number({min: -500, max: 500})
  });
}

function createCampsiteImage(campsiteId, knex) {
  return knex('campsite_images').insert({
    campsite_id: campsiteId[0],
    filename: getFilenames()[0],
    caption: faker.lorem.sentence()
  });
}

function createCampsiteWithImages(tripId, knex) {
  return createCampsite(tripId, knex).then(campsiteId => {
    let promises = [];
    promises.push(createCampsiteImage(campsiteId, knex));
    promises.push(createTripCampsite(tripId, campsiteId, knex));

    return Promise.all(promises);
  });
}

function createCampsite(tripId, knex) {
  return knex('campsites').returning('id').insert({
      name: "C" + faker.random.number({
        min: 1,
        max: 10
      }),
      lat: faker.random.number({
        min: 38,
        max: 41,
        precision: .0001
      }),
      lng: faker.random.number({
        min: -109,
        max: -112,
        precision: .0001
      })
  });
}

function getMarkdown() {
  return faker.lorem.paragraphs(3) + '\n\n <iframe style="margin-top:25px; margin-bottom:25px" width="100%" height="290" src="https://www.youtube.com/embed/fci4ylynQwI" frameborder="0" allowfullscreen></iframe>\n\n' + faker.lorem.paragraphs(3);
}

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
