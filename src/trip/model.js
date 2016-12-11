const googleClient = require('@google/maps');

class Trip {
  constructor(data, imageDao) {
    this.data = data;
    this.imageDao = imageDao;
    this.gClient = googleClient.createClient({
      key: process.env.GOOGLE_API_KEY
    })
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
    return this.imageDao.find(this.id());
  }

  travelTime({lat, lng}) {
    console.log(lat, lng);
    return 1;
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Trip;
