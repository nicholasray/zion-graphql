const Model = require('../lib/framework/model');
const ImageUrl = require('../imageUrl/model');

class Image extends Model {
  constructor(data) {
    super(data);
    this.imageUrl = new ImageUrl(data);
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
    return this.imageUrl;
  }
}

module.exports = Image;
