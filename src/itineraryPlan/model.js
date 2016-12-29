const Model = require('../lib/model');

class ItineraryPlan extends Model {
  constructor(data, campsiteDao) {
    super(data);
    this.campsiteDao = campsiteDao;
  }

  itineraryId() {
    return this.data.itinerary_id;
  }

  campsite() {
    return this.campsiteDao.findById(this.data.campsite_id);
  }

  day() {
    return this.data.day;
  }

  miles() {
    return this.data.miles;
  }

  elevationGain() {
    return this.data.elevation_gain;
  }
}

module.exports = ItineraryPlan;