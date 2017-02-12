class Response {
  constructor(user = null, errors = []) {
    this.user = user;
    this.errors = errors;
  }

  user() {
    return this.user;
  }

  errors() {
    return this.errors;
  }
}

module.exports = Response;
