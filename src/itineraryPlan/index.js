const ItineraryPlan = require('./model');
const Dao = require('./dao')
const ConnectionDao = require('../lib/framework/connectionDao');
const Repository = require('./repository');

function init(db, daos, config) {
  const dao = new Repository(new Dao(db, daos));
  const connectionDao = new ConnectionDao(dao);

  initEndpoints(dao, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type ItineraryPlanConnection {
      totalCount: Int!
      edges: [ItineraryPlanEdge]!
    }

    type ItineraryPlanEdge {
      node: ItineraryPlan
    }

    type ItineraryPlan {
      id: ID!
      itineraryId: ID!
      campsite: Campsite
      day: Int
      distance: Float
      elevationGain: Int
      createdAt: String!
      updatedAt: String!
    }

    input ItineraryPlanInput {
      itineraryId: ID
      campsiteId: ID
      day: Int
      distance: Float
      elevationGain: Int
    }

    type ItineraryPlanResponse {
      node: ItineraryPlan
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allItineraryPlans(limit: Int, offset: Int): ItineraryConnection!
  `

  const mutationEndpoints = `
    createItineraryPlan(input: ItineraryPlanInput): ItineraryPlanResponse
    updateItineraryPlan(id: ID!, input: ItineraryPlanInput): ItineraryPlanResponse
    deleteItineraryPlan(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allItineraryPlans: (args, ctx) => {
      return connectionDao.all(args, ctx.user);
    },
    createItineraryPlan: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateItineraryPlan: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteItineraryPlan: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
