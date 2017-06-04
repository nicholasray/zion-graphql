exports.up = function(knex, Promise) {
  return knex.schema.table('areas', function(table) {
    table.string('weather_source')
      .notNullable()
      .defaultTo('');
    table.string('weather_source_link')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('areas', function(table) {
    table.dropColumn('weather_source');
    table.dropColumn('weather_source_link');
  })
};
