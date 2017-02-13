const Model = require('../lib/framework/model');

class Image extends Model {
  constructor(data) {
    super(data);
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

  url({sizes}) {
    return sizes.map(size => {
      return `https://adventuretrailhead-dest.s3.amazonaws.com/images/${size.toLowerCase()}/${this.filename()}`;
    })
  }
}

module.exports = Image;
