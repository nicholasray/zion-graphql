const googleClient = require('@google/maps');
const TravelClient = require('../lib/travel/client');
const TravelDao = require('../travel/dao');

class Trip {
  constructor(data, { imageDao, travelDao, campsiteDao, itineraryDao, areaDao }) {
    this.data = data;
    this.imageDao = imageDao;
    this.travelDao = travelDao;
    this.campsiteDao = campsiteDao;
    this.areaDao = areaDao;
    this.itineraryDao = itineraryDao;
  }

  id() {
    return this.data.id;
  }

  area() {
    return this.areaDao.findById(this.data.area_id);
  }

  images() {
    return this.imageDao.withTripId(this.id());
  }

  campsites() {
    return this.campsiteDao.withTripId(this.id());
  }

  itineraries() {
    return this.itineraryDao.withTripId(this.id());
  }

  slug() {
    return this.data.slug;
  }

  mapUrl() {
    if (this.data.map_id == null) {
      return null;
    }

    return `https://caltopo.com/m/${this.data.map_id}`;
  }

  name() {
    return this.data.name;
  }

  tagline() {
    return this.data.tagline;
  }

  description() {
    return this.data.description;
  }

  lat() {
    return this.data.lat;
  }

  lng() {
    return this.data.lng
  }

  travelTime({lat, lng}) {
    return this.travelDao.find({
      origin: `${lat},${lng}`,
      destination: `${this.lat()},${this.lng()}`
    })
  }

  distance() {
    return this.data.distance;
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Trip;
