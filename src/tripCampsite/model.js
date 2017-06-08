const Campsite = require('../campsite/model');

class TripCampsite extends Campsite {
  tripId() {
    return this.data.trip_id;
  }

  campsiteId() {
    return this.data.campsite_id;
  }

  images(args, ctx) {
    return this.campsiteImageDao.withCampsiteId(this.campsiteId(), ctx.user);
  }

  rank() {
    return this.data.rank;
  }
}

module.exports = TripCampsite;
