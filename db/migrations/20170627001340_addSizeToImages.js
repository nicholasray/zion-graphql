exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.integer('height')
      .notNullable()
      .defaultTo(0);
    table.integer('width')
      .notNullable()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('width');
    table.dropColumn('height');
  });
};
