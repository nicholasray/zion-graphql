exports.up = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.text('campsites_description')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.text('campsites_description')
      .notNullable()
      .defaultTo('');
  });
};
