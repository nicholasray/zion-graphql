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
    type CampsiteConnection {
      totalCount: Int!
      edges: [CampsiteEdge]!
    }

    type CampsiteEdge {
      node: Campsite
    }

    type Campsite {
      id: ID!
      availabilityId: ID
      images: [CampsiteImage]!
      name: String
      lat: Float
      lng: Float
      createdAt: String!
      updatedAt: String!
    }

    input CampsiteInput {
      availabilityId: ID!
      name: String
      lat: Float
      lng: Float
    }

    type CampsiteResponse {
      node: Campsite
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allCampsites(limit: Int, offset: Int): CampsiteConnection!
  `;

  const mutationEndpoints = `
    createCampsite(input: CampsiteInput): CampsiteResponse
    updateCampsite(id: ID!, input: CampsiteInput): CampsiteResponse
    deleteCampsite(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allCampsites: (args, ctx) => {
      return connectionDao.all(args);
    },
    createCampsite: ({input}) => {
      return dao.create(input);
    },
    updateCampsite: ({id, input}) => {
      return dao.update(id, input);
    },
    deleteCampsite: ({id}) => {
      return dao.delete(id);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
