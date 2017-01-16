function defaultColumns(table) {
  table.increments('id').primary();
  table.timestamps(true, true);
}

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('areas', table => {
      defaultColumns(table);
      table.string('slug').notNullable();
      table.string('name');
      table.float('lat');
      table.float('lng');
      table.float('jan_avg_high');
      table.float('jan_avg_low');
      table.float('jan_avg_precip');
      table.float('jan_record_high');
      table.float('jan_record_low');
      table.float('feb_avg_high');
      table.float('feb_avg_low');
      table.float('feb_avg_precip');
      table.float('feb_record_high');
      table.float('feb_record_low');
      table.float('mar_avg_high');
      table.float('mar_avg_low');
      table.float('mar_avg_precip');
      table.float('mar_record_high');
      table.float('mar_record_low');
      table.float('apr_avg_high');
      table.float('apr_avg_low');
      table.float('apr_avg_precip');
      table.float('apr_record_high');
      table.float('apr_record_low');
      table.float('may_avg_high');
      table.float('may_avg_low');
      table.float('may_avg_precip');
      table.float('may_record_high');
      table.float('may_record_low');
      table.float('june_avg_high');
      table.float('june_avg_low');
      table.float('june_avg_precip');
      table.float('june_record_high');
      table.float('june_record_low');
      table.float('july_avg_high');
      table.float('july_avg_low');
      table.float('july_avg_precip');
      table.float('july_record_high');
      table.float('july_record_low');
      table.float('aug_avg_high');
      table.float('aug_avg_low');
      table.float('aug_avg_precip');
      table.float('aug_record_high');
      table.float('aug_record_low');
      table.float('sept_avg_high');
      table.float('sept_avg_low');
      table.float('sept_avg_precip');
      table.float('sept_record_high');
      table.float('sept_record_low');
      table.float('oct_avg_high');
      table.float('oct_avg_low');
      table.float('oct_avg_precip');
      table.float('oct_record_high');
      table.float('oct_record_low');
      table.float('nov_avg_high');
      table.float('nov_avg_low');
      table.float('nov_avg_precip');
      table.float('nov_record_high');
      table.float('nov_record_low');
      table.float('dec_avg_high');
      table.float('dec_avg_low');
      table.float('dec_avg_precip');
      table.float('dec_record_high');
      table.float('dec_record_low');
      table.unique('slug');
    }),

    knex.schema.createTable('trips', function(table) {
        defaultColumns(table);
        table.integer('area_id')
          .references('id')
          .inTable('areas')
          .notNullable()
          .onDelete('CASCADE');
        table.string('slug').notNullable();
        table.string('map_id');
        table.string('name');
        table.string('tagline');
        table.float('distance');
        table.text('description');
        table.text('permit');
        table.float('lat');
        table.float('lng');
        table.text('season');
        table.text('directions');
        table.unique('slug');
        table.index(['lat', 'lng']);
        table.index('area_id');
    }),

    knex.schema.createTable('trip_reports', function(table) {
        defaultColumns(table);
        table.integer('trip_id')
          .references('id')
          .inTable('trips')
          .notNullable()
          .onDelete('CASCADE');
        table.integer('user_id')
          .references('id')
          .inTable('users')
          .notNullable()
          .onDelete('CASCADE');
        table.text('description');
        table.index('trip_id');
        table.index('user_id');
    }),

    knex.schema.createTable('users', function(table) {
        defaultColumns(table);
        table.integer('facebook_id')
        table.string('name');
    }),

    knex.schema.createTable('itineraries', table => {
      defaultColumns(table);
      table.integer('trip_id')
        .references('id')
        .inTable('trips')
        .notNullable()
        .onDelete('CASCADE');
      table.string('start');
      table.string('end')
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
      table.float('distance');
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
      table.integer('rank')
      table.string('filename');
      table.string('caption');
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
        table.integer('rank')
        table.string('filename');
        table.string('caption');
        table.index(['trip_id']);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTableIfExists('images'),
      knex.schema.dropTableIfExists('campsite_images'),
      knex.schema.dropTableIfExists('itinerary_plans'),
      knex.schema.dropTableIfExists('itineraries'),
      knex.schema.dropTableIfExists('trip_campsites'),
      knex.schema.dropTableIfExists('campsites'),
      knex.schema.dropTableIfExists('trip_reports'),
      knex.schema.dropTableIfExists('users'),
      knex.schema.dropTableIfExists('trips'),
      knex.schema.dropTableIfExists('areas')
  ])
};
