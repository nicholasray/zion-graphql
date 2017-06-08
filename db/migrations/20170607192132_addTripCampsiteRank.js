exports.up = function(knex, Promise) {
  return knex.schema.table('trip_campsites', function(table) {
    table.integer('rank')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trip_campsites', function(table) {
    table.text('rank')
      .notNullable();
  });
};
