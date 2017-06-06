var faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let promises = [];
      for (var i = 0; i < 100; i++) {
        promises.push(createArea(knex).then(areaId => {
          let promises = [];

          promises.push(createTrip(areaId, knex));
          promises.push(createUser(knex));

          return Promise.all(promises);
        }).then(results => {
            let tripId = results[0];
            let userId = results[1];
            let promises = [];

            promises.push(createTripReport(tripId, userId, knex));
            promises.push(createTripImage(tripId, 1, knex));
            promises.push(createTripImage(tripId, 2, knex));
            promises.push(createCampsiteWithImages(tripId, 1, knex));
            promises.push(createCampsiteWithImages(tripId, 1, knex));
            promises.push(createCampsiteWithImages(tripId, 1, knex));
            promises.push(createCampsiteWithImages(tripId, 1, knex));
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
                promises.push(createCampsiteImage(campsiteId, 1, knex));

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

function createUser(knex) {
  return knex('users').returning('id').insert({
    facebook_id: 584807405,
    first_name: faker.lorem.words(2),
    last_name: faker.lorem.words(2),
    email: faker.internet.email()
  });
}

function createTripReport(tripId, userId, knex) {
  return knex('trip_reports').returning('id').insert({
    trip_id: tripId[0],
    user_id: userId[0],
    description: getMarkdown('kCtz_5F0H2o'),
  })
}

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
    weather_source: 'Western Regional Climate Center',
    weather_source_link: 'http://www.wrcc.dri.edu/cgi-bin/cliMAIN.pl?ut2592',
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
    map_id: '11p7kERE3FTrGh0or1Ogq2fg_BCE',
    name,
    tagline: faker.lorem.words(7),
    short_description: faker.lorem.words(15),
    campsites_description: faker.lorem.words(15),
    description: getMarkdown(),
    directions: faker.lorem.paragraph(),
    permit: faker.lorem.paragraph(),
    logistics: faker.lorem.paragraph(),
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
    is_published: true
  });
}

function createTripCampsite(tripId, campsiteId, knex) {
  return knex('trip_campsites').returning('id').insert({
    trip_id: tripId[0],
    campsite_id: campsiteId[0]
  });
}

function createTripImage(tripId, rank, knex) {
  return createImage(knex).then(imageId => {
    return knex('trip_images').insert({
      trip_id: tripId[0],
      image_id: imageId[0],
      rank,
    });
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
    distance: faker.random.number({min: 1, max: 10})
  });
}

function createCampsiteImage(campsiteId, rank, knex) {
  createImage(knex).then(imageId => {
    return knex('campsite_images').insert({
      campsite_id: campsiteId[0],
      image_id: imageId[0],
      rank
    });
  })
}

function createCampsiteWithImages(tripId, rank, knex) {
  return createCampsite(tripId, knex).then(campsiteId => {
    let promises = [];
    promises.push(createCampsiteImage(campsiteId, rank, knex));
    promises.push(createTripCampsite(tripId, campsiteId, knex));

    return Promise.all(promises);
  });
}

function createImage(knex) {
  const path = getPaths()[0];
  return knex('images').returning('id').insert({
    filename: path.split('/').pop(),
    path: path,
    title: faker.lorem.word(),
    caption: faker.lorem.word(),
    alt: faker.lorem.words(2),
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

function getMarkdown(videoId = 'fci4ylynQwI') {
  return faker.lorem.paragraphs(3) + '\n\n <iframe style="margin-top:25px; margin-bottom:25px" width="100%" height="290" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>\n\n' + faker.lorem.paragraphs(3);
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function getPaths() {
 const paths = [
 "/2017/5/26/37_5dea084e-11dd-46d2-896d-8906f4bae8ec.jpg",
 "/2017/5/26/35_15bc501e-e236-4769-b8ad-84f1c7cf54a8.jpg",
 "/2017/5/26/33_66eeaacf-adb1-441a-b193-456ed2af1d15.jpg",
 "/2017/5/26/31_1b78adcc-f693-4265-b1dd-366269c35f79.jpg",
 "/2017/5/26/32_21e6b358-d5aa-4615-9635-8a042d7846fc.jpg",
 "/2017/5/26/29_56bb5b10-93d7-4723-b8d9-2fffef04398b.jpg",
 "/2017/5/26/28_23a193d4-2924-40e7-8eb1-1e99ba866c55.jpg",
 "/2017/5/26/26_b4be35d3-d736-49f3-9f7c-44ba11b52c2e.jpg",
 "/2017/5/26/25_e874e2ea-4c4c-4bd3-98e3-5d10b5fa4120.jpg",
 "/2017/5/26/24_6c110cd5-40c4-4ad0-b7d1-994240137c52.jpg",
 "/2017/5/26/23_a2f692ce-1291-4038-9f1f-533fff4c4329.jpg",
 "/2017/5/26/22_a57c8987-0fc4-4913-b200-c96d57a960c5.jpg",
 "/2017/5/26/21_3ae59546-f646-461d-b667-357c736e06b4.jpg",
 "/2017/5/26/20_ae439203-3424-4cd8-9e49-8aa43a4f8da6.jpg",
 "/2017/5/26/19_bfcee4a3-8512-47c7-8913-4522bde03188.jpg",
 "/2017/5/26/18_2a1029f0-a250-4c1d-ab20-180a8de088dc.jpg",
 "/2017/5/26/17_b97f9e09-9601-4f2f-bb02-9a5f706b702b.jpg",
 "/2017/5/26/16_af0277c3-635a-4de3-b92b-4db0d52e1a7e.jpg",
 "/2017/5/26/15_93421e14-2fd9-42eb-a54b-53db757f1cfb.jpg",
 "/2017/5/26/14_fe684d1b-3019-4c39-abe5-06a5a8d639b0.jpg",
 "/2017/5/26/13_2026f364-a146-4ddd-a2db-bc22a1d96589.jpg",
 "/2017/5/26/12_a8d7e176-915e-46b4-9896-dfb05938f92b.jpg",
 "/2017/5/26/11_95c82a9e-b18a-4228-8cb1-c45ba6a69a06.jpg",
 "/2017/5/26/10_3b8886b6-e2a5-4e7b-9db0-9e116217b7f0.jpg",
 "/2017/5/26/9_120378c9-9919-49fd-91c7-8e09f3e2a3b3.jpg",
 "/2017/5/26/8_116949b8-e412-4248-8a98-81989bf16694.jpg",
 "/2017/5/26/7_22ef72fa-5905-4caf-87eb-fc826e66abaa.jpg",
 "/2017/5/26/6_f3ea3ae2-aedc-4224-878e-526529db8242.jpg",
 "/2017/5/26/5_5b62e7a1-f54c-476f-86e1-1cb5ce2a381d.jpg",
 "/2017/5/26/4_023d9dce-0399-4d28-b9f3-e755fb4a484d.jpg",
 "/2017/5/26/2_6d47dbd8-2ebb-4910-ac0c-ad628b082922.jpg",
 "/2017/5/26/1_34ff4afe-d015-4a5a-b6f9-ab180e590a6e.jpg",
 "/2017/5/26/36_755553df-1c20-418a-9826-98d6e75dd396.jpg",
 "/2017/5/26/34_c2c8c564-e839-44c7-853c-433f994ac4b4.jpg",
 "/2017/5/26/30_e664c0cb-0e0e-4d54-8034-cf6b52cffa77.jpg",
 "/2017/5/26/27_570ce441-6452-4824-a3b2-dfedd73b70e9.jpg",
 "/2017/5/26/3_f44c305b-3aee-475c-9326-98b8a2c17599.jpg",
 "/2017/5/26/38_f0b823f2-d6d8-4a99-adb9-3a0fa400a4af.jpg",
 "/2017/5/26/39_dc49b4a7-f14c-4071-abe3-32ee36795b95.jpg",
 "/2017/5/26/40_811c9ce6-04a5-4b62-9d09-83b63a4144a7.jpg",
 ];

  const random = faker.random.number({
    min: 0,
    max: 39
  });

  return [paths[random]];
}
