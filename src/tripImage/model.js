const Image = require('../image/model');

class TripImage extends Image {
  tripId() {
    return this.data.trip_id;
  }

  imageId() {
    return this.data.image_id;
  }

  rank() {
    return this.data.rank;
  }
}

module.exports = TripImage;
