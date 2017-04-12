const SchemaBuilder = require('./schemaBuilder');

class Config {
  constructor() {
    this.endpoints = {};
    this.schemaBuilder = new SchemaBuilder();
  }

  getEndpoints() {
    return this.endpoints;
  }

  getSchema() {
    return this.schemaBuilder.build();
  }

  addEndpoints(endpoints) {
    this.endpoints = Object.assign({}, this.endpoints, endpoints)
  }

  addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints = '') {
    this.schemaBuilder.addTypes(types);
    this.schemaBuilder.addQueryEndpoints(queryEndpoints);

    this.schemaBuilder.addMutationEndpoints(mutationEndpoints)
  }
}

module.exports = Config;
