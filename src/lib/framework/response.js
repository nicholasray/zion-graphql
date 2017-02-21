class Response {
  constructor(node = null, daos, errors = []) {
    this.data = {};
    this.data.node = node;
    this.data.daos = daos;
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
