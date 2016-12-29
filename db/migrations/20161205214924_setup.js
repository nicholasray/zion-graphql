function defaultColumns(table) {
  table.increments('id').primary();
  table.timestamps(true, true);
}

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trips', function(table) {
        defaultColumns(table);
        table.string('slug').notNullable();
        table.string('map_id');
        table.string('name');
        table.string('tagline');
        table.float('distance');
        table.text('description');
        table.float('lat');
        table.float('lng');
        table.unique('slug');
        table.index(['lat', 'lng']);
    }),

    knex.schema.createTable('itineraries', table => {
      defaultColumns(table);
      table.integer('trip_id')
        .references('id')
        .inTable('trips')
        .notNullable()
        .onDelete('CASCADE');
      table.index('trip_id');
    }),

    knex.schema.createTable('itinerary_plans', table => {
      defaultColumns(table);
      table.integer('itinerary_id')
        .references('id')
        .inTable('itineraries')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('campsite_id')
        .references('id')
        .inTable('campsites')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('day');
      table.float('miles');
      table.integer('elevation_gain');
      table.index('itinerary_id');
      table.index('campsite_id');
    }),

    knex.schema.createTable('campsites', table => {
      defaultColumns(table);
      table.string('name');
      table.float('lat');
      table.float('lng');
    }),

    knex.schema.createTable('campsite_images', table => {
      defaultColumns(table);
      table.integer('campsite_id')
        .references('id')
        .inTable('campsites')
        .notNullable()
        .onDelete('CASCADE');
      table.string('filename');
      table.index('campsite_id');
    }),

    knex.schema.createTable('trip_campsites', table => {
      defaultColumns(table);
      table.integer('trip_id')
        .references('id')
        .inTable('trips')
        .notNullable()
        .onDelete('CASCADE');
      table.integer('campsite_id')
        .references('id')
        .inTable('campsites')
        .notNullable()
        .onDelete('CASCADE');
      table.index('trip_id');
    }),

    knex.schema.createTable('images', function(table) {
        defaultColumns(table);
        table.integer('trip_id')
          .references('id')
          .inTable('trips')
          .notNullable()
          .onDelete('CASCADE');
        table.string('filename');
        table.index(['trip_id']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('images'),
      knex.schema.dropTable('campsite_images'),
      knex.schema.dropTable('itinerary_plans'),
      knex.schema.dropTable('itineraries'),
      knex.schema.dropTable('trip_campsites'),
      knex.schema.dropTable('campsites'),
      knex.schema.dropTable('trips'),
  ])
};
