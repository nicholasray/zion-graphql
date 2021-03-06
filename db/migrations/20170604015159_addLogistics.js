
exports.up = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.text('logistics')
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('trips', function(table) {
    table.dropColumn('logistics');
  })
};
