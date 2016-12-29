const Model = require('../lib/model');

class Campsite extends Model {
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
