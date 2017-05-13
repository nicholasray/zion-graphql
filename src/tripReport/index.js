const Dao = require('./dao')
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
  const types = `
    type TripReportConnection {
      totalCount: Int!
      edges: [TripReportEdge]!
    }

    type TripReportEdge {
      node: TripReport
    }

    type TripReport {
      id: ID!
      tripId: ID!
      user: User!
      description: String!
      createdAt: String!
      updatedAt: String!
    }

    input TripReportInput {
      tripId: ID
      description: String
    }

    type TripReportResponse {
      node: TripReport
      errors: [ResponseError!]!
    }
  `;

  const queryEndpoints = `
    allTripReports(limit: Int, offset: Int): TripReportConnection!
    tripReportsWithTripId(id: ID!): [TripReport]!
  `

  const mutationEndpoints = `
    createTripReport(input: TripReportInput): TripReportResponse
    updateTripReport(id: ID!, input: TripReportInput): TripReportResponse
    deleteTripReport(id: ID!): ID!
  `

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, connectionDao, config) {
  const endpoints = {
    allTripReports: (args, ctx) => {
      return connectionDao.all(args, ctx.user);
    },
    tripReportsWithTripId: ({id}, ctx) => {
      return dao.withTripId(id, ctx.user);
    },
    createTripReport: ({input}, ctx) => {
      // TODO: Don't hard code this
      const newInput = Object.assign({}, input, {userId: 1});

      return dao.create(newInput, ctx.user);
    },
    updateTripReport: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    },
    deleteTripReport: ({id}, ctx) => {
      return dao.delete(id, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
