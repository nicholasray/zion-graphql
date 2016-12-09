var DataLoader = require('dataloader');
var Trip = require('./model');
var Dao = require('./dao')

function init(db, config) {
  initLoaders(db, config);
  initEndpoints(db, config);
}

function initLoaders(db, config) {
  const loaders = {
    images: new DataLoader(keys => Dao.getImagesWithTripIds(keys, db)),
  }

  config.addLoaders(loaders);
}

function initSchema() {
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
