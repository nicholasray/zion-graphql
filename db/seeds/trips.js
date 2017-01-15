var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let promises = [];
      for (var i = 0; i < 1000; i++) {
        promises.push(createArea(knex).then(areaId => {
          let promises = [];

          promises.push(createTrip(areaId, knex));

          return Promise.all(promises);
        }).then(results => {
            let tripId = results[0];
            let promises = [];

            promises.push(createTripImage(tripId, 1, knex));
            promises.push(createTripImage(tripId, 2, knex));
            promises.push(createCampsiteWithImages(tripId, 1, knex));
            promises.push(createCampsiteWithImages(tripId, 2, knex));
            promises.push(createCampsiteWithImages(tripId, 3, knex));
            promises.push(createCampsiteWithImages(tripId, 4, knex));
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
                promises.push(createCampsiteImage(campsiteId, 5, knex));

                return Promise.all(promises);
              })
            );

            return Promise.all(promises);
          })
        )
      }

      return Promise.all(promises);
    });
};

function createArea(knex) {
  let name = faker.lorem.words(3);
  return knex('areas').returning('id').insert({
    name,
    slug: slugify(name) + faker.random.number({min: 1, max: 1000000}),
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
    jan_avg_high: 52,
    jan_avg_low: 29,
    jan_record_high: 71,
    jan_record_low: -2,
    jan_avg_precip: 1.6,
    feb_avg_high: 57,
    feb_avg_low: 31,
    feb_record_high: 78,
    feb_record_low: 4,
    feb_avg_precip: 1.6,
    mar_avg_high: 63,
    mar_avg_low: 36,
    mar_record_high: 86,
    mar_record_low: 12,
    mar_avg_precip: 1.7,
    apr_avg_high: 73,
    apr_avg_low: 43,
    apr_record_high: 94,
    apr_record_low: 23,
    apr_avg_precip: 1.3,
    may_avg_high: 83,
    may_avg_low: 52,
    may_record_high: 102,
    may_record_low: 22,
    may_avg_precip: 0.7,
    june_avg_high: 93,
    june_avg_low: 60,
    june_record_high: 114,
    june_record_low: 40,
    june_avg_precip: 0.6,
    july_avg_high: 100,
    july_avg_low: 68,
    july_record_high: 115,
    july_record_low: 51,
    july_avg_precip: 0.8,
    aug_avg_high: 97,
    aug_avg_low: 69,
    aug_record_high: 111,
    aug_record_low: 50,
    aug_avg_precip: 1.6,
    sept_avg_high: 91,
    sept_avg_low: 60,
    sept_record_high: 110,
    sept_record_low: 33,
    sept_avg_precip: 0.8,
    oct_avg_high: 78,
    oct_avg_low: 49,
    oct_record_high: 97,
    oct_record_low: 23,
    oct_avg_precip: 1,
    nov_avg_high: 63,
    nov_avg_low: 37,
    nov_record_high: 83,
    nov_record_low: 13,
    nov_avg_precip: 1.2,
    dec_avg_high: 53,
    dec_avg_low: 30,
    dec_record_high: 71,
    dec_record_low: 6,
    dec_avg_precip: 1.5
  });
}

function createTrip(areaId, knex) {
  let name = faker.lorem.words(3);
  return knex('trips').returning('id').insert({
    area_id: areaId[0],
    distance: faker.random.number({
      min: 1,
      max: 100
    }),
    season: faker.lorem.paragraph(),
    slug: slugify(name) + faker.random.number({min: 1, max: 100000}),
    map_id: 'DG1G',
    name,
    tagline: faker.lorem.words(7),
    description: getMarkdown(),
    directions: faker.lorem.paragraph(),
    permit: faker.lorem.paragraph(),
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


function createTripCampsite(tripId, campsiteId, knex) {
  return knex('trip_campsites').returning('id').insert({
    trip_id: tripId[0],
    campsite_id: campsiteId[0]
  });
}

function createTripImage(tripId, rank, knex) {
  return knex('images').insert({
    trip_id: tripId[0],
    rank,
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

function createCampsiteImage(campsiteId, rank, knex) {
  return knex('campsite_images').insert({
    campsite_id: campsiteId[0],
    filename: getFilenames()[0],
    rank,
    caption: faker.lorem.sentence()
  });
}

function createCampsiteWithImages(tripId, rank, knex) {
  return createCampsite(tripId, knex).then(campsiteId => {
    let promises = [];
    promises.push(createCampsiteImage(campsiteId, rank, knex));
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
