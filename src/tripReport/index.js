const Dao = require('./dao')
const ConnectionDao = require('../lib/framework/connectionDao');

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
      return connectionDao.all(args);
    },
    tripReportsWithTripId: ({id}) => {
      return dao.withTripId(id);
    },
    createTripReport: ({input}) => {
      // TODO: Don't hard code this
      const newInput = Object.assign({}, input, {userId: 1});

      return dao.create(newInput);
    },
    updateTripReport: ({id, input}) => {
      return dao.update(id, input);
    },
    deleteTripReport: ({id}) => {
      return dao.delete(id);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
