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

    type TripCampsiteInput {
      trip_id: ID
      image_id: ID
    }

    type TripCampsiteResponse {
      node: TripCampsiteWrite
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    campsitesWithTripId(id: ID!): [TripCampsite]!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    campsitesWithTripId: ({id}) => {
      return dao.withTripId(id);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
