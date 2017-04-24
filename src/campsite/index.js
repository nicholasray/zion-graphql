const Dao = require('./dao')

function init(db, daos, config) {
  const dao = new Dao(db, daos);

  initEndpoints(dao, config);
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

    input CampsiteInput {
      name: String
      lat: Float
      lng: Float
    }

    type CampsiteResponse {
      node: Campsite
      errors: [ResponseError!]!
    }
  `;

  const mutationEndpoints = `
    updateCampsite(id: ID!, input: CampsiteInput): CampsiteResponse
  `

  config.addSchemaTypesAndEndpoints(types, '', mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    updateCampsite: ({id, input}) => {
      return dao.update(id, input);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
