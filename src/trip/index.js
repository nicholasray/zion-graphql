const Trip = require('./model');
const Dao = require('./dao');
const ConnectionDao = require('../lib/framework/connectionDao');
const ImageDao = require('../tripImage/dao');

function init(db, daos, config) {
  const dao = new Dao(db, daos);
  const connectionDao = new ConnectionDao(dao);

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
      area: Area!
      images:[TripImage]!
      campsites: [Campsite]!
      itineraries: [Itinerary]!
      reports: [TripReport]!
      slug: ID!
      permit: String
      mapUrl: String
      name: String!
      tagline: String
      description: String!
      distance: Int
      lat: Float
      lng: Float
      travelTime(lat: Float!, lng: Float!): Int
      season: String
      directions: String
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
