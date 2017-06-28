exports.up = function(knex, Promise) {
  return knex.raw(`CREATE VIEW trip_images_view AS SELECT trip_images.*, images.filename, images.path, images.alt, images.title, images.caption, images.focal_point_x, images.focal_point_y, images.width, images.height FROM trip_images INNER JOIN images ON images.id = trip_images.image_id ORDER BY rank ASC;`);
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP VIEW trip_images_view');
};
