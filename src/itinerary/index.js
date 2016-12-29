const Itinerary = require('./model');
const Dao = require('./dao')

function init(db, itineraryPlanDao, config) {
  const dao = new Dao(db, itineraryPlanDao);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type Itinerary {
      id: ID!
      tripId: ID!
      plans: [ItineraryPlan]!
      createdAt: String!
      updatedAt: String!
    }
  `;

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
