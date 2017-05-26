const Dao = require('./dao');
const ConnectionDao = require('../lib/framework/connectionDao');
const Repository = require('./repository');

function init(db, config) {
  const dao = new Dao(db, {});
  const connectionDao = new Repository(new ConnectionDao(dao));

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
      path: String!
      url: String!
      caption: String
      title: String
      alt: String
      createdAt: String!
      updatedAt: String!
    }

    input ImageInput {
      filename: String
      path: String
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
    deleteImage(id: ID!): ID!
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allImages: (args, ctx) => {
      return connectionDao.all(args, ctx.user);
    },
    image: ({id}, ctx) => {
      return dao.findById(id, ctx.user);
    },
    createImage: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateImage: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteImage: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
