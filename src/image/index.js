const Dao = require('./dao');
const ConnectionDao = require('../lib/framework/connectionDao');

function init(db, config) {
  const dao = new Dao(db, {});
  const connectionDao = new ConnectionDao(dao);

  initEndpoints(dao, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type ImageConnection {
      totalCount: Int!
      edges: [ImageEdge]!
    }

    type ImageEdge {
      node: Image
    }

    type Image {
      id: ID!
      filename: String!
      caption: String
      title: String
      alt: String
      url: ImageUrl!
      createdAt: String!
      updatedAt: String!
    }

    input ImageInput {
      filename: String
      caption: String
      title: String
      alt: String
    }

    type ImageResponse {
      node: Image
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allImages(limit: Int, offset: Int): ImageConnection!
  `;

  const mutationEndpoints = `
    createImage(input: ImageInput): ImageResponse
    updateImage(id: ID!, input: ImageInput): ImageResponse
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allImages: (args, ctx) => {
      return connectionDao.all(args);
    },
    image: ({id}) => {
      return dao.findById(id);
    },
    createImage: ({input}) => {
      return dao.create(input);
    },
    updateImage: ({id, input}) => {
      return dao.update(id, input);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
