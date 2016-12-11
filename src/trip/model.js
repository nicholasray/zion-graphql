const googleClient = require('@google/maps');
const TravelClient = require('../lib/travel/client');
const TravelDao = require('../travel/dao');

class Trip {
  constructor(data, imageDao, travelDao) {
    this.data = data;
    this.imageDao = imageDao;
    this.travelDao = travelDao;
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
    return this.travelDao.find({
      origin: `${lat},${lng}`,
      destination: `${this.lat()},${this.lng()}`
    })
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Trip;
