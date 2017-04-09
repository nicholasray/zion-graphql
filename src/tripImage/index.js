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

    input TripImageInput {
      trip_id: ID!
      image_id: ID!
      rank: Int
    }

    type TripImageResponse {
      node: TripImage
      errors: [ResponseError!]!
    }
  `;

  const mutationEndpoints = `
    createTripImage(input: TripImageInput): TripImageResponse
    updateTripImage(id: ID!, input: TripImageInput): TripImageResponse
  `

  config.addSchemaTypesAndEndpoints(types, '', mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    allImages: ({limit, offset}) => {
      return dao.all({limit, offset});
    },
    createTripImage: ({input}) => {
      return dao.create(input);
    },
    updateTripImage: ({id, input}) => {
      return dao.update(id, input);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
