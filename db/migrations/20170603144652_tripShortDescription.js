exports.up = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.string('short_description')
      .notNullable()
      .defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.dropColumn('short_description');
  })
};
