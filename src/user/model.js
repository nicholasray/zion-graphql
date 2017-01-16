const Model = require('../lib/model');

class User extends Model {
  constructor(data) {
    super(data);
  }

  name() {
    return this.data.name;
  }

  profilePicUrl() {
    return `https://graph.facebook.com/${this.data.facebook_id}/picture?type=normal`
  }
}

module.exports = User;
