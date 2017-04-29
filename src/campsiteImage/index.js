const Dao = require('./dao')

function init(db, config) {
  const dao = new Dao(db);
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
    createCampsiteImage: ({input}) => {
      return dao.create(input);
    },
    updateCampsiteImage: ({id, input}) => {
      return dao.update(id, input);
    },
    deleteCampsiteImage: ({id}) => {
      return dao.delete(id);
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
