const Image = require('../image/model');

class CampsiteImage extends Image {
  campsiteId() {
    return this.data.campsite_id;
  }

  imageId() {
    return this.data.image_id;
  }

  rank() {
    return this.data.rank;
  }
}

module.exports = CampsiteImage;
