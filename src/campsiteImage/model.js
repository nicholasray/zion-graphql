const Image = require('../image/model');

class CampsiteImage extends Image {
  campsiteId() {
    return this.data.campsite_id;
  }

  rank() {
    return this.data.rank;
  }
}

module.exports = CampsiteImage;
