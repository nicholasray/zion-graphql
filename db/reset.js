module.exports = function(knex) {
  return Promise.all([
      knex.raw('DROP TABLE IF EXISTS trip_images CASCADE'),
      knex.raw('DROP TABLE IF EXISTS campsite_images CASCADE'),
      knex.raw('DROP TABLE IF EXISTS itinerary_plans CASCADE'),
      knex.raw('DROP TABLE IF EXISTS trip_campsites CASCADE'),
      knex.raw('DROP TABLE IF EXISTS campsites CASCADE'),
      knex.raw('DROP TABLE IF EXISTS trip_reports CASCADE'),
      knex.raw('DROP TABLE IF EXISTS images CASCADE'),
      knex.raw('DROP TABLE IF EXISTS trips CASCADE'),
      knex.raw('DROP TABLE IF EXISTS areas CASCADE'),
      knex.raw('DROP TABLE IF EXISTS users CASCADE'),
  ]);
}
