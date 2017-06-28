const Image = require('./model');
const Dao = require('./dao')
const Repository = require('./repository');

function init(db, config) {
  const dao = new Repository(new Dao(db));
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
      imageId: ID!
      rank: Int
      filename: String!
      path: String!
      url: String!
      title: String
      alt: String
      focalPointX: Float!
      focalPointY: Float!
      width: Int!
      height: Int!
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
      tripId: ID
      imageId: ID
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
    deleteTripImage(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    tripImagesWithTripId: ({id}, ctx) => {
      return dao.withTripId(id, ctx.user);
    },
    createTripImage: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateTripImage: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteTripImage: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
