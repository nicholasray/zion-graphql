const Image = require('./model');

function init(db, config) {
  initLoaders(db, config);
  initEndpoints(db, config);
  initSchema(config);
}

function initLoaders(db, config) {
  return {};
}

function initSchema(config) {
  const types = `
    type Image {
      id: ID!
      tripId: ID!
      filename: String!
      url(size: String!): String!
      createdAt: String!
      updatedAt: String!
    }
  `;

  const queryEndpoints = `
    allImages(limit: Int, offset: Int): [Image]
  `
  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(db, config) {
  const endpoints = {
    allImages: ({limit, offset}) => {
      return db.select('*').from('images').limit(limit).offset(offset).then((rows) => {
        return rows.map((row) => {return new Image(row)});
      })
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
