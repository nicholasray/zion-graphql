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
    enum TripImageSize {
      SMALL
      MEDIUM
      LARGE
      XLARGE
    }

    type Image {
      id: ID!
      tripId: ID!
      rank: Int
      filename: String!
      url(sizes: [TripImageSize!]!): [String]!
      caption: String
      createdAt: String!
      updatedAt: String!
    }
  `;

  const queryEndpoints = `
    allImages(limit: Int, offset: Int): [Image]
  `;
  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    allImages: ({limit, offset}) => {
      return dao.all({limit, offset});
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
