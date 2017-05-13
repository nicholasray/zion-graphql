const Dao = require('./dao')
const Repository = require('./repository');

function init(db, daos, config) {
  const dao = new Repository(new Dao(db, daos));
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
      availabilityId: ID
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
    createTripCampsite: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    campsitesWithTripId: ({id}, ctx) => {
      return dao.withTripId(id, ctx.user);
    },
    deleteTripCampsite: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
