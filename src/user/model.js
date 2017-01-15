const Model = require('../lib/model');

class User extends Model {
  constructor(data) {
    super(data);
  }

  name() {
    return this.data.name;
  }
}

module.exports = User;
