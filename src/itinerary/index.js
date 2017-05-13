const Dao = require('./dao')
const ConnectionDao = require('../lib/framework/connectionDao');
const Repository = require('./repository');

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
      return connectionDao.all(args, ctx.user);
    },
    itinerariesWithTripId: ({id}, ctx) => {
      return dao.withTripId(id, ctx.user);
    },
    createItinerary: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateItinerary: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteItinerary: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
