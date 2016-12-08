class Trip {
  constructor(data, imageDao) {
    this.data = data;
    this.imageDao = imageDao;
  }

  id() {
    return this.data.id;
  }

  lat() {
    return this.data.lat;
  }

  lng() {
    return this.data.lng
  }

  images() {
    return this.imageDao.load(this.id());
  }
}

module.exports = Trip;
