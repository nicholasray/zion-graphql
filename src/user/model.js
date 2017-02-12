const Model = require('../lib/model');

class User extends Model {
  constructor(data, daos) {
    super(data);
  }

  firstName() {
    return this.data.first_name;
  }

  lastName() {
    return this.data.last_name;
  }

  email() {
    return this.data.email;
  }

  newsletterSubscribedAt() {
    return this.data.newsletter_subscribed_at;
  }

  profilePicUrl() {
    return `https://graph.facebook.com/${this.data.facebook_id}/picture?type=normal`
  }
}

module.exports = User;
