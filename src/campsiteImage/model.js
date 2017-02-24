const Model = require('../lib/framework/model');
const ImageUrl = require('../imageUrl/model');

class CampsiteImage extends Model {
  constructor(data) {
    super(data);
    this.imageUrl = new ImageUrl(data);
  }

  campsiteId() {
    return this.data.campsite_id;
  }

  rank() {
    return this.data.rank;
  }

  filename() {
    return this.data.filename;
  }

  caption() {
    return this.data.caption;
  }

  url() {
    return this.imageUrl;
  }

}

module.exports = CampsiteImage;
