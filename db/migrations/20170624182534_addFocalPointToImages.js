exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.float('focal_point_x')
      .notNullable()
      .defaultTo(.5);
    table.float('focal_point_y')
      .notNullable()
      .defaultTo(.5);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('focal_point_x');
    table.dropColumn('focal_point_y');
  });
};
