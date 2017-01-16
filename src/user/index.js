const Dao = require('./dao');

function init(db, config) {
  const dao = new Dao(db);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type User {
      id: ID!
      profilePicUrl: String
      name: String
    }
  `

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
