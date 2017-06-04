exports.up = function(knex, Promise) {
  return knex.schema.table('itinerary_plans', function(table) {
    table.dropColumn('elevation_gain');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('itinerary_plans', function(table) {
    table.integer('elevation_gain');
  })
};
