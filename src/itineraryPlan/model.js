const Model = require('../lib/framework/model');

class ItineraryPlan extends Model {
  constructor(data, {campsiteDao}) {
    super(data);
    this.campsiteDao = campsiteDao;
  }

  itineraryId() {
    return this.data.itinerary_id;
  }

  campsite(args, ctx) {
    return this.campsiteDao.findById(this.data.campsite_id, ctx.user);
  }

  day() {
    return this.data.day;
  }

  distance() {
    return this.data.distance;
  }
}

module.exports = ItineraryPlan;
