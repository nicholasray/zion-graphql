const Campsite = require('./model');
const Dao = require('./dao')

function init(db, config) {
  const dao = new Dao(db);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type Campsite {
      id: ID!
      name: String
      lat: Float
      lng: Float
      createdAt: String!
      updatedAt: String!
    }
  `;

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
