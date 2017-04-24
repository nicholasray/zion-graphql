const Image = require('./model');
const Dao = require('./dao')

function init(db, config) {
  const dao = new Dao(db);
  initEndpoints(dao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type TripImage {
      id: ID!
      tripId: ID!
      rank: Int
      filename: String!
      url: ImageUrl!
      title: String
      alt: String
      caption: String
      createdAt: String!
      updatedAt: String!
    }

    type TripImageWrite {
      id: ID!
      tripId: ID!
      imageId: ID!
      rank: Int
    }

    input TripImageInput {
      trip_id: ID
      image_id: ID
      rank: Int
    }

    type TripImageResponse {
      node: TripImageWrite
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    tripImagesWithTripId(id: ID!): [TripImage]!
  `;

  const mutationEndpoints = `
    createTripImage(input: TripImageInput): TripImageResponse
    updateTripImage(id: ID!, input: TripImageInput): TripImageResponse
    deleteTripImage(id: ID!): Int!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    tripImagesWithTripId: ({id}) => {
      return dao.withTripId(id);
    },
    createTripImage: ({input}) => {
      return dao.create(input);
    },
    updateTripImage: ({id, input}) => {
      return dao.update(id, input);
    },
    deleteTripImage: ({id}) => {
      return dao.delete(id);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
