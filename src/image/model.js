const Model = require('../lib/framework/model');

class Image extends Model {
  constructor(data) {
    super(data);
  }

  id() {
    return this.data.id;
  }

  filename() {
    return this.data.filename
  }

  path() {
    return this.data.path;
  }

  caption() {
    return this.data.caption;
  }

  title() {
    return this.data.title;
  }

  alt() {
    return this.data.alt;
  }

  url() {
    return process.env.IMAGE_CDN + this.path();
  }

  focalPointX() {
    return this.data.focal_point_x;
  }

  focalPointY() {
    return this.data.focal_point_y;
  }
}

module.exports = Image;
