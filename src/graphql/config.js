class GraphqlConfig {
  constructor() {
    this.loaders = {};
    this.endpoints = {};
  }

  getLoaders() {
    return this.loaders;
  }

  getEndpoints() {
    return this.endpoints;
  }

  addLoaders(loader) {
    this.loaders = Object.assign({}, this.loaders, loader);
  }

  addEndpoints(endpoints) {
    this.endpoints = Object.assign({}, this.endpoints, endpoints)
  }
}

module.exports = GraphqlConfig;
