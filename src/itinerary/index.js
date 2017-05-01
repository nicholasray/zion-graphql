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

    input ItineraryInput {
      tripId: ID
      start: String
      end: String
    }

    type ItineraryResponse {
      node: Itinerary
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allItineraries(limit: Int, offset: Int): ItineraryConnection!
    itinerariesWithTripId(id: ID!): [Itinerary]!
  `

  const mutationEndpoints = `
    createItinerary(input: ItineraryInput): ItineraryResponse
    updateItinerary(id: ID!, input: ItineraryInput): ItineraryResponse
    deleteItinerary(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allItineraries: (args, ctx) => {
      return connectionDao.all(args);
    },
    itinerariesWithTripId: ({id}) => {
      return dao.withTripId(id);
    },
    createItinerary: ({input}) => {
      return dao.create(input);
    },
    updateItinerary: ({id, input}) => {
      return dao.update(id, input);
    },
    deleteItinerary: ({id}) => {
      return dao.delete(id);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
