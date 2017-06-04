exports.up = function(knex, Promise) {
  return knex.schema.table('areas', function(table) {
    table.string('weather_source')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('areas', function(table) {
    table.dropColumn('weather_source');
  })
};
