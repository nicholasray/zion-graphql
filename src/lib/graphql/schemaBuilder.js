class SchemaBuilder {
  constructor() {
    this.types = '';
    this.queryEndpoints = '';
  }

  addTypes(type) {
    this.types += `\n${type}`
  }

  addQueryEndpoints(endpoint) {
    this.queryEndpoints += `${endpoint}`;
  }

  build() {
    return `
      ${this.types}

      type Query {
        ${this.queryEndpoints}
      }
    `;
  }
}

module.exports = SchemaBuilder;
