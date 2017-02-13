const Model = require('../lib/framework/model');

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

  start() {
    return this.data.start;
  }

  end() {
    return this.data.end;
  }
}

module.exports = Itinerary;
