const DataLoader = require('dataloader');
const Trip = require('./model');
const Dao = require('./dao')

function init(db, config) {
  initLoaders(db, config);
  initEndpoints(db, config);
  initSchema(config);
}

function initLoaders(db, config) {
  const loaders = {
    images: new DataLoader(keys => Dao.getImagesWithTripIds(keys, db)),
  }

  config.addLoaders(loaders);
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

function initEndpoints(db, config) {
  const endpoints = {
    allTrips: (args, ctx) => {
      return db.select('*').from('trips').then((rows) => {
        return rows.map((row) => {return new Trip(row, ctx.dataLoaders.images)});
      })
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
