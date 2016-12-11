const DataLoader = require('dataloader');
const Trip = require('./model');
const Dao = require('./dao')
const ImageDao = require('../image/dao');

function init(db, imageDao, travelDao, config) {
  const dao = new Dao(db, imageDao, travelDao);

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
      travelTime(lat: Float!, lng: Float!): Int
      createdAt: String!
      updatedAt: String!
    }

    input BoundsInput {
      seLat: Float!
      seLng: Float!
      nwLat: Float!
      nwLng: Float!
    }
  `;

  const queryEndpoints = `
    allTrips(limit: Int, offset: Int, bounds: BoundsInput): [Trip]
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(dao, config) {
  const endpoints = {
    allTrips: ({limit, offset, bounds}, ctx) => {
      return dao.all({limit, offset, bounds});
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
