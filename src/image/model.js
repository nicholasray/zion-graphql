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
    return `www.s3.com/${size}/${this.filename()}`
  }

  createdAt() {
    return this.data.created_at
  }
}

module.exports = Image;
