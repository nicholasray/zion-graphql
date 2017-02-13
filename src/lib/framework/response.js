class Response {
  constructor(node = null, errors = []) {
    this.data = {};
    this.data.node = node;
    this.data.errors = errors;
  }

  node() {
    return this.data.node;
  }

  errors() {
    return this.data.errors;
  }
}

module.exports = Response;
