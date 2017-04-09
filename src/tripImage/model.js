const Image = require('../image/model');

class TripImage extends Image {
  tripId() {
    return this.data.trip_id;
  }

  rank() {
    return this.data.rank;
  }
}

module.exports = TripImage;
