module.exports = function(knex) {
  return Promise.all([
      knex.schema.dropTableIfExists('trip_images'),
      knex.schema.dropTableIfExists('campsite_images'),
      knex.schema.dropTableIfExists('itinerary_plans'),
      knex.schema.dropTableIfExists('itineraries'),
      knex.schema.dropTableIfExists('trip_campsites'),
      knex.schema.dropTableIfExists('campsites'),
      knex.schema.dropTableIfExists('trip_reports'),
      knex.schema.dropTableIfExists('images'),
      knex.schema.dropTableIfExists('trips'),
      knex.schema.dropTableIfExists('areas'),
      knex.schema.dropTableIfExists('users')
  ]);
}
