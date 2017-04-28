const Campsite = require('../campsite/model');

class TripCampsite extends Campsite {
  tripId() {
    return this.data.trip_id;
  }

  campsiteId() {
    return this.data.campsite_id;
  }

  images() {
    return this.campsiteImageDao.withCampsiteId(this.campsiteId());
  }
}

module.exports = TripCampsite;
