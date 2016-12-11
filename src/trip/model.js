const googleClient = require('@google/maps');
const TravelClient = require('../lib/travel/client');

class Trip {
  constructor(data, imageDao) {
    this.data = data;
    this.imageDao = imageDao;
    this.travelClient = new TravelClient();
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
    return this.travelClient.calculateTravel({
      origin: `${lat},${lng}`,
      destination: `${this.lat()},${this.lng()}`
    }).then(res => {
      if (res.status != "OK") {
        return null;
      }

      return res.duration.value;
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
