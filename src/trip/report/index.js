const Dao = require('./dao')

function init(db, daos, config) {
  const dao = new Dao(db, daos);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type TripReport {
      id: ID!
      user: User!
      description: String!
      createdAt: String!
      updatedAt: String!
    }
  `;

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
