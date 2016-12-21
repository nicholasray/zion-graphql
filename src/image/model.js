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

  url({size}) {
    return `https://adventuretrailhead-target.s3.amazonaws.com/images/${this.filename()}`;
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Image;
