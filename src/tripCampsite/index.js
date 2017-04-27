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
    type TripCampsite {
      id: ID!
      tripId: ID!
      campsiteId: ID!
      images: [CampsiteImage]!
      name: String
      lat: Float
      lng: Float
      createdAt: String!
      updatedAt: String!
    }

    type TripCampsiteWrite {
      id: ID!
      tripId: ID!
      campsiteId: ID!
    }

    input TripCampsiteInput {
      tripId: ID
      campsiteId: ID
    }

    type TripCampsiteResponse {
      node: TripCampsiteWrite
      errors: [ResponseError!]!
    }
  `;

  const mutationEndpoints = `
    createTripCampsite(input: TripCampsiteInput): TripCampsiteResponse
    deleteTripCampsite(id: ID!): ID!
  `

  const queryEndpoints = `
    campsitesWithTripId(id: ID!): [TripCampsite]!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    createTripCampsite: ({input}) => {
      return dao.create(input);
    },
    campsitesWithTripId: ({id}) => {
      return dao.withTripId(id);
    },
    deleteTripCampsite: ({id}) => {
      return dao.delete(id);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
