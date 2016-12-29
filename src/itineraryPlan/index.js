const ItineraryPlan = require('./model');
const Dao = require('./dao')

function init(db, campsiteDao, config) {
  const dao = new Dao(db, campsiteDao);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type ItineraryPlan {
      id: ID!
      itineraryId: ID!
      campsite: Campsite
      day: Int
      miles: Float
      elevationGain: Int
      createdAt: String!
      updatedAt: String!
    }
  `;

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
