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
    return `https://venturetrailhead-images.s3.amazonaws.com/${this.filename()}.JPG`;
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Image;
