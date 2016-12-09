class SchemaBuilder {
  constructor() {
    this.types = '';
    this.endpoints = '';
  }

  addTypes(type) {
    this.types += `\n${type}`
  }

  addEndpoints(endpoint) {
    this.endpoints += `${endpoint}`;
  }

  build() {
    return `
      ${this.types}

      type Query {
        ${this.endpoints}
      }
    `;
  }
}

module.exports = SchemaBuilder;
