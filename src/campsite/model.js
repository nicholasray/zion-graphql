const Model = require('../lib/framework/model');

class Campsite extends Model {
  constructor(data, campsiteImageDao) {
    super(data);
    this.campsiteImageDao = campsiteImageDao;
  }

  images() {
    return this.campsiteImageDao.withCampsiteId(this.id());
  }

  name() {
    return this.data.name;
  }

  lat() {
    return this.data.lat;
  }

  lng() {
    return this.data.lng;
  }
}

module.exports = Campsite;
