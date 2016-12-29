const Model = require('../lib/model');

class Itinerary extends Model {
  constructor(data, itineraryPlanDao) {
    super(data);
    this.itineraryPlanDao = itineraryPlanDao;
  }

  tripId() {
    return this.data.trip_id;
  }

  plans() {
    return this.itineraryPlanDao.withItineraryId(this.id());
  }
}

module.exports = Itinerary;
