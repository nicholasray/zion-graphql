const Campsite = require('./model');
const Dao = require('./dao')

function init(db, campsiteImageDao, config) {
  const dao = new Dao(db, campsiteImageDao);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type Campsite {
      id: ID!
      images: [CampsiteImage]!
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
