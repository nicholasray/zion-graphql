const Campsite = require('../campsite/model');

class TripCampsite extends Campsite {
  tripId() {
    return this.data.trip_id;
  }

  campsiteId() {
    return this.data.campsite_id;
  }
}

module.exports = TripCampsite;
