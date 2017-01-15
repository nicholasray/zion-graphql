const Dao = require('./dao')

function init(db, config) {
  const dao = new Dao(db);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    enum CampsiteImageSize {
      SMALL
      MEDIUM
      LARGE
      XLARGE
    }

    type CampsiteImage {
      id: ID!
      campsiteId: ID!
      rank: Int
      filename: String!
      url(sizes: [CampsiteImageSize!]!): [String]!
      caption: String
      createdAt: String!
      updatedAt: String!
    }
  `;

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
