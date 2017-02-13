const Model = require('../lib/framework/model');

class CampsiteImage extends Model {
  constructor(data) {
    super(data);
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

  url({sizes}) {
    return sizes.map(size => {
      return `https://adventuretrailhead-dest.s3.amazonaws.com/images/${size.toLowerCase()}/${this.filename()}`;
    })
  }

}

module.exports = CampsiteImage;
