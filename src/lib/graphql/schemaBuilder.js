class SchemaBuilder {
  constructor() {
    this.types = '';
    this.queryEndpoints = '';
    this.mutationEndpoints = '';
  }

  addTypes(type) {
    this.types += `\n${type}`
  }

  addQueryEndpoints(endpoint) {
    this.queryEndpoints += `${endpoint}`;
  }

  addMutationEndpoints(endpoints) {
    this.mutationEndpoints += `${endpoints}`;
  }

  build() {
    return `
      ${this.types}

      type Query {
        ${this.queryEndpoints}
      }

      type Mutation {
       ${this.mutationEndpoints}
      }
    `;
  }
}

module.exports = SchemaBuilder;
