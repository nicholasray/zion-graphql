
exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.string('path')
      .notNullable()
      .defaultTo('');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('path');
  })
};
