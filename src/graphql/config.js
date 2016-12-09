const SchemaBuilder = require('./schemaBuilder');

class Config {
  constructor() {
    this.loaders = {};
    this.endpoints = {};
    this.schemaBuilder = new SchemaBuilder();
  }

  getLoaders() {
    return this.loaders;
  }

  getEndpoints() {
    return this.endpoints;
  }

  getSchema() {
    return this.schemaBuilder.build();
  }

  addLoaders(loader) {
    this.loaders = Object.assign({}, this.loaders, loader);
  }

  addEndpoints(endpoints) {
    this.endpoints = Object.assign({}, this.endpoints, endpoints)
  }

  addSchemaTypesAndEndpoints(types, queryEndpoints) {
    this.schemaBuilder.addTypes(types);
    this.schemaBuilder.addQueryEndpoints(queryEndpoints);
  }
}

module.exports = Config;
