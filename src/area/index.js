const Dao = require('./dao');
const ConnectionDao = require('../lib/framework/connectionDao');
const Repository = require('./repository');

function init(db, daos, config) {
  const dao = new Repository(new Dao(db, daos));
  const connectionDao = new ConnectionDao(dao);

  initEndpoints(dao, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types= `
    type AreaConnection {
      totalCount: Int!
      edges: [AreaEdge]!
    }

    type AreaEdge {
      node: Area
    }

    type Area {
      id: ID!
      name: String!
      lat: Float
      lng: Float
      weatherSource: String
      weatherSourceLink: String
      janAvgHigh: Int
      janAvgLow: Int
      janAvgPrecip: Float
      janRecordHigh: Int
      janRecordLow: Int
      febAvgHigh: Int
      febAvgLow: Int
      febAvgPrecip: Float
      febRecordHigh: Int
      febRecordLow: Int
      marAvgHigh: Int
      marAvgLow: Int
      marAvgPrecip: Float
      marRecordHigh: Int
      marRecordLow: Int
      aprAvgHigh: Int
      aprAvgLow: Int
      aprAvgPrecip: Float
      aprRecordHigh: Int
      aprRecordLow: Int
      mayAvgHigh: Int
      mayAvgLow: Int
      mayAvgPrecip: Float
      mayRecordHigh: Int
      mayRecordLow: Int
      juneAvgHigh: Int
      juneAvgLow: Int
      juneAvgPrecip: Float
      juneRecordHigh: Int
      juneRecordLow: Int
      julyAvgHigh: Int
      julyAvgLow: Int
      julyAvgPrecip: Float
      julyRecordHigh: Int
      julyRecordLow: Int
      augAvgHigh: Int
      augAvgLow: Int
      augAvgPrecip: Float
      augRecordHigh: Int
      augRecordLow: Int
      septAvgHigh: Int
      septAvgLow: Int
      septAvgPrecip: Float
      septRecordHigh: Int
      septRecordLow: Int
      octAvgHigh: Int
      octAvgLow: Int
      octAvgPrecip: Float
      octRecordHigh: Int
      octRecordLow: Int
      novAvgHigh: Int
      novAvgLow: Int
      novAvgPrecip: Float
      novRecordHigh: Int
      novRecordLow: Int
      decAvgHigh: Int
      decAvgLow: Int
      decAvgPrecip: Float
      decRecordHigh: Int
      decRecordLow: Int
      createdAt: String!
      updatedAt: String!
    }

    input AreaInput {
      name: String
      lat: Float
      lng: Float
      weatherSource: String
      weatherSourceLink: String
      janAvgHigh: Int
      janAvgLow: Int
      janAvgPrecip: Float
      janRecordHigh: Int
      janRecordLow: Int
      febAvgHigh: Int
      febAvgLow: Int
      febAvgPrecip: Float
      febRecordHigh: Int
      febRecordLow: Int
      marAvgHigh: Int
      marAvgLow: Int
      marAvgPrecip: Float
      marRecordHigh: Int
      marRecordLow: Int
      aprAvgHigh: Int
      aprAvgLow: Int
      aprAvgPrecip: Float
      aprRecordHigh: Int
      aprRecordLow: Int
      mayAvgHigh: Int
      mayAvgLow: Int
      mayAvgPrecip: Float
      mayRecordHigh: Int
      mayRecordLow: Int
      juneAvgHigh: Int
      juneAvgLow: Int
      juneAvgPrecip: Float
      juneRecordHigh: Int
      juneRecordLow: Int
      julyAvgHigh: Int
      julyAvgLow: Int
      julyAvgPrecip: Float
      julyRecordHigh: Int
      julyRecordLow: Int
      augAvgHigh: Int
      augAvgLow: Int
      augAvgPrecip: Float
      augRecordHigh: Int
      augRecordLow: Int
      septAvgHigh: Int
      septAvgLow: Int
      septAvgPrecip: Float
      septRecordHigh: Int
      septRecordLow: Int
      octAvgHigh: Int
      octAvgLow: Int
      octAvgPrecip: Float
      octRecordHigh: Int
      octRecordLow: Int
      novAvgHigh: Int
      novAvgLow: Int
      novAvgPrecip: Float
      novRecordHigh: Int
      novRecordLow: Int
      decAvgHigh: Int
      decAvgLow: Int
      decAvgPrecip: Float
      decRecordHigh: Int
      decRecordLow: Int
    }

    type AreaResponse {
      node: Area
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allAreas(limit: Int, offset: Int): AreaConnection!
    area(id: ID!): Area
  `

  const mutationEndpoints = `
    createArea(input: AreaInput): AreaResponse
    updateArea(id: ID!, input: AreaInput): AreaResponse
    deleteArea(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allAreas: (args, ctx) => {
      return connectionDao.all(args, ctx.user);
    },
    area: ({id}, ctx) => {
      return dao.findById(id, ctx.user);
    },
    createArea: ({input}, ctx) => {
      return dao.create(input, ctx.user);
    },
    updateArea: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteArea: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
