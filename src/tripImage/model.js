const Model = require('../lib/framework/model');
const ImageUrl = require('../imageUrl/model');

class TripImage extends Model {
  constructor(data) {
    super(data);
    this.imageUrl = new ImageUrl(data);
  }

  id() {
    return this.data.id;
  }

  tripId() {
    return this.data.trip_id;
  }

  rank() {
    return this.data.rank;
  }

  filename() {
    return this.data.filename
  }

  caption() {
    return this.data.caption;
  }

  url() {
    return this.imageUrl;
  }
}

module.exports = TripImage;
