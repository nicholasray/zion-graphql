exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trips', function(table) {
        table.increments('id').primary();
        table.string('slug').notNullable();
        table.string('map_id');
        table.string('name');
        table.string('tagline');
        table.float('distance');
        table.text('description');
        table.float('lat');
        table.float('lng');
        table.timestamps(true, true);
        table.unique('slug');
        table.index(['lat', 'lng']);
    }),

    knex.schema.createTable('images', function(table) {
        table.increments('id').primary();
        table.integer('trip_id')
          .references('id')
          .inTable('trips')
          .notNullable()
          .onDelete('CASCADE');
        table.string('filename');
        table.timestamps(true, true);
        table.index(['trip_id']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('images'),
      knex.schema.dropTable('trips'),
  ])
};
