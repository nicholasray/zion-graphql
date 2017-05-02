const Model = require('../lib/framework/model');

class Report extends Model {
  constructor(data, { userDao }) {
    super(data);
    this.userDao = userDao;
  }

  tripId() {
    return this.data.trip_id;
  }

  user() {
    return this.userDao.findById(this.data.user_id);
  }

  description() {
    return this.data.description;
  }
}

module.exports = Report;
