exports.up = function(knex, Promise) {
  return knex.raw(`CREATE VIEW campsite_images_view AS SELECT campsite_images.*, images.filename, images.path, images.alt, images.title, images.caption, images.focal_point_x, images.focal_point_y, images.width, images.height FROM campsite_images INNER JOIN images ON images.id = campsite_images.image_id ORDER BY rank ASC;`);
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP VIEW campsite_images_view');
};
