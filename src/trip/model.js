const googleClient = require('@google/maps');
const TravelClient = require('../lib/travel/client');
const TravelDao = require('../travel/dao');
const Model = require('../lib/framework/model');

class Trip extends Model {
  constructor(data, { imageDao, travelDao, tripCampsiteDao, itineraryDao, areaDao, reportDao, tripDao }) {
    super(data);
    this.imageDao = imageDao;
    this.travelDao = travelDao;
    this.campsiteDao = tripCampsiteDao;
    this.areaDao = areaDao;
    this.reportDao = reportDao;
    this.itineraryDao = itineraryDao;
    this.tripDao = tripDao;
  }

  areaId() {
    return this.data.area_id;
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

  reports() {
    return this.reportDao.withTripId(this.id());
  }

  slug() {
    return this.data.slug;
  }

  permit() {
    return this.data.permit;
  }

  permitPath() {
    return this.data.permit_path;
  }

  season() {
    return this.data.season;
  }

  directions() {
    return this.data.directions;
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

  season() {
    return this.data.season;
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

  relatedTrips() {
    return this.tripDao.related(this);
  }
}

module.exports = Trip;
