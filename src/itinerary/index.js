const Dao = require('./dao')
const ConnectionDao = require('../lib/framework/connectionDao');

function init(db, daos, config) {
  const dao = new Dao(db, daos);
  const connectionDao = new ConnectionDao(dao);

  initEndpoints(dao, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type ItineraryConnection {
      totalCount: Int!
      edges: [ItineraryEdge]!
    }

    type ItineraryEdge {
      node: Itinerary
    }

    type Itinerary {
      id: ID!
      tripId: ID!
      plans: [ItineraryPlan]!
      start: String
      end: String
      createdAt: String!
      updatedAt: String!
    }
  `;

  const queryEndpoints = `
    allItineraries(limit: Int, offset: Int): ItineraryConnection!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, '');
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allItineraries: (args, ctx) => {
      return connectionDao.all(args);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
