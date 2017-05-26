const Dao = require('./dao')
const Repository = require('./repository');

function init(db, config) {
  const dao = new Repository(new Dao(db));
  initEndpoints(dao, config)
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type CampsiteImage {
      id: ID!
      campsiteId: ID!
      imageId: ID!
      rank: Int
      filename: String!
      url: String!
      path: String!
      url: ImageUrl!
      title: String
      alt: String
      caption: String
      createdAt: String!
      updatedAt: String!
    }

    type CampsiteImageWrite {
      id: ID!
      campsiteId: ID!
      imageId: ID!
      rank: Int
    }

    input CampsiteImageInput {
      campsiteId: ID
      imageId: ID
      rank: Int
    }

    type CampsiteImageResponse {
      node: CampsiteImageWrite
      errors: [ResponseError!]!
    }
  `;

  const mutationEndpoints = `
    createCampsiteImage(input: CampsiteImageInput): CampsiteImageResponse
    updateCampsiteImage(id: ID!, input: CampsiteImageInput): CampsiteImageResponse
    deleteCampsiteImage(id: ID!): ID!
    campsiteImage(id: ID!): Int!
  `

  config.addSchemaTypesAndEndpoints(types, '', mutationEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    createCampsiteImage: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateCampsiteImage: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteCampsiteImage: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
