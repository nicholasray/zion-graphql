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

  area(args, ctx) {
    return this.areaDao.findById(this.data.area_id, ctx.user);
  }

  images(args, ctx) {
    return this.imageDao.withTripId(this.id(), ctx.user);
  }

  campsites(args, ctx) {
    return this.campsiteDao.withTripId(this.id(), ctx.user);
  }


  itineraries(args, ctx) {
    return this.itineraryDao.withTripId(this.id(), ctx.user);
  }

  reports(args, ctx) {
    return this.reportDao.withTripId(this.id(), ctx.user);
  }

  campsitesDescription() {
    return this.data.campsites_description;
  }

  isPublished() {
    return this.data.is_published;
  }

  slug() {
    return this.data.slug;
  }

  permit() {
    return this.data.permit;
  }

  permitPath(args, ctx) {
    return this.campsiteDao.withTripId(this.id(), ctx.user).then(campsites => {
      let ids = campsites.filter(campsite => {
        return campsite.availabilityId();
      }).map(campsite => {
        return campsite.availabilityId();
      })

      const idSet = new Set(ids);
      ids = [...idSet]

      if (ids.length == 0) {
        return '';
      }

      return `/permits?ids=${ids.join(',')}`
    })
  }

  season() {
    return this.data.season;
  }

  directions() {
    return this.data.directions;
  }

  mapId() {
    return this.data.map_id;
  }

  mapUrl() {
    if (this.data.map_id == null) {
      return null;
    }

    return `https://www.google.com/maps/d/u/1/embed?mid=${this.data.map_id}`;
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

  shortDescription() {
    return this.data.short_description;
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

  logistics() {
    return this.data.logistics;
  }

  relatedTrips(args, ctx) {
    return this.tripDao.related(this, ctx.user);
  }
}

module.exports = Trip;
