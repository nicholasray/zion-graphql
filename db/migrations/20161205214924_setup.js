function defaultColumns(table) {
  table.increments('id').primary();
  table.timestamps(true, true);
}

function updatedAtTrigger(knex, tableName) {
  return knex.raw(`CREATE TRIGGER update_${tableName}_modtime BEFORE UPDATE ON ${tableName} FOR EACH ROW EXECUTE PROCEDURE update_modified_column();`);
}


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw(`CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';`),
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
    }).then(() => {
      return updatedAtTrigger(knex, 'areas');
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
        table.string('permit_path');
        table.boolean('is_published')
          .notNullable()
          .defaultTo(false);
        table.unique('slug');
        table.index(['lat', 'lng']);
        table.index('area_id');
    }).then(() => {
      return updatedAtTrigger(knex, 'trips');
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
    }).then(() => {
      return updatedAtTrigger(knex, 'trip_reports');
    }),

    knex.schema.createTable('users', function(table) {
        defaultColumns(table);
        table.integer('facebook_id')
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.timestamp('newsletter_subscribed_at');
        table.unique('email');
    }).then(() => {
      return updatedAtTrigger(knex, 'users');
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
    }).then(() => {
      return updatedAtTrigger(knex, 'itineraries');
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
        .onDelete('CASCADE');
      table.integer('day');
      table.float('distance');
      table.integer('elevation_gain');
      table.index('itinerary_id');
      table.index('campsite_id');
    }).then(() => {
      return updatedAtTrigger(knex, 'itinerary_plans');
    }),

    knex.schema.createTable('campsites', table => {
      defaultColumns(table);
      table.string('name');
      table.float('lat');
      table.float('lng');
    }).then(() => {
      return updatedAtTrigger(knex, 'campsites');
    }),

    knex.schema.createTable('campsite_images', function(table) {
        defaultColumns(table);
        table.integer('campsite_id')
          .references('id')
          .inTable('campsites')
          .notNullable()
          .onDelete('CASCADE');
        table.integer('image_id')
          .references('id')
          .inTable('images')
          .notNullable()
          .onDelete('CASCADE');
        table.integer('rank');
        table.unique(['campsite_id', 'image_id']);
    }).then(() => {
      return updatedAtTrigger(knex, 'campsite_images');
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
      table.unique(['campsite_id', 'trip_id']);
    }).then(() => {
      return updatedAtTrigger(knex, 'trip_campsites');
    }),

    knex.schema.createTable('images', function(table) {
        defaultColumns(table);
        table.string('filename');
        table.string('title');
        table.string('caption');
        table.string('alt');
        table.index('filename');
    }).then(() => {
      return updatedAtTrigger(knex, 'images');
    }),

    knex.schema.createTable('trip_images', function(table) {
        defaultColumns(table);
        table.integer('trip_id')
          .references('id')
          .inTable('trips')
          .notNullable()
          .onDelete('CASCADE');
        table.integer('image_id')
          .references('id')
          .inTable('images')
          .notNullable()
          .onDelete('CASCADE');
        table.integer('rank');
        table.unique(['trip_id', 'image_id']);
    }).then(() => {
      return updatedAtTrigger(knex, 'trip_images');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTableIfExists('trip_images'),
      knex.schema.dropTableIfExists('campsite_images'),
      knex.schema.dropTableIfExists('itinerary_plans'),
      knex.schema.dropTableIfExists('itineraries'),
      knex.schema.dropTableIfExists('trip_campsites'),
      knex.schema.dropTableIfExists('campsites'),
      knex.schema.dropTableIfExists('trip_reports'),
      knex.schema.dropTableIfExists('images'),
      knex.schema.dropTableIfExists('users'),
      knex.schema.dropTableIfExists('trips'),
      knex.schema.dropTableIfExists('areas')
  ])
};
