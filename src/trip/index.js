const DataLoader = require('dataloader');
const Trip = require('./model');
const Dao = require('./dao')
const ImageDao = require('../image/dao');

function init(db, imageDao, config) {
  const dao = new Dao(db, imageDao);

  initEndpoints(dao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    type Trip {
      id: ID!
      images:[Image]!
      lat: Float
      lng: Float
      createdAt: String!
      updatedAt: String!
    }
  `;

  const queryEndpoints = `
    allTrips: [Trip]
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    allTrips: (args, ctx) => {
      return dao.all(args);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
