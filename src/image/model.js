class Image {
  constructor(data) {
    this.data = data;
  }

  id() {
    return this.data.id;
  }

  tripId() {
    return this.data.trip_id;
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

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Image;
