const Model = require('../../lib/model');

class Report extends Model {
  constructor(data, { userDao }) {
    super(data);
    this.userDao = userDao;
  }

  user() {
    return this.userDao.findById(this.data.user_id);
  }

  description() {
    return this.data.description;
  }
}

module.exports = Report;
