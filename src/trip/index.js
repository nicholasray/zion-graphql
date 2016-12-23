const DataLoader = require('dataloader');
const Trip = require('./model');
const Dao = require('./dao');
const ConnectionDao = require('./connectionDao');
const ImageDao = require('../image/dao');

function init(db, imageDao, travelDao, config) {
  const dao = new Dao(db, imageDao, travelDao);
  const connectionDao = new ConnectionDao(db, dao);

  initEndpoints(dao, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    enum TripOrderBy {
      FEATURED
      DISTANCE
      DISTANCE_DESC
    }

    type TripConnection {
      totalCount: Int!
      edges: [TripEdge]!
    }

    type TripEdge {
      node: Trip
    }

    type Trip {
      id: ID!
      slug: ID!
      name: String!
      description: String!
      images:[Image]!
      distance: Int
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

    input DistanceInput {
      min: Int!
      max: Int!
    }
  `;

  const queryEndpoints = `
    allTrips(distance: DistanceInput, limit: Int, offset: Int, bounds: BoundsInput, sort: [TripOrderBy] = [FEATURED]): TripConnection!
    trip(id: ID!): Trip
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allTrips: (args, ctx) => {
      return connectionDao.all(args);
    },
    trip: ({id}) => {
      return dao.findById(id);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
