const Dao = require('./dao');
const Repository = require('./repository');
const ConnectionDao = require('../lib/framework/connectionDao');
const Validator = require('./validator');
const Response = require('../lib/framework/response');

function init(db, daos, config) {
  const dao = new Repository(new Dao(db, daos));
  const connectionDao = new ConnectionDao(dao);
  const validator = new Validator(dao);

  initEndpoints(dao, validator, connectionDao, config);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types = `
    input UserInput {
      firstName: String
      lastName: String
      email: String!
      newsletterSubscribedAt: String
    }

    type User {
      id: ID!
      profilePicUrl: String
      firstName: String
      lastName: String
      email: String
      newsletterSubscribedAt: String
      createdAt: String!
      updatedAt: String!
    }

    type UserConnection {
      totalCount: Int!
      edges: [UserEdge]!
    }

    type ResponseError {
      key: String
      message: String!
    }

    type UserResponse {
      node: User
      errors: [ResponseError!]!
    }

    type UserEdge {
      node: User
    }
  `;

  const queryEndpoints =  `
    allUsers(limit: Int, offset: Int): UserConnection!
  `;

  const mutationEndpoints = `
    createUser(input: UserInput): UserResponse
    updateUser(id: ID!, input: UserInput): UserResponse
  `;

  config.addSchemaTypesAndEndpoints(types, queryEndpoints, mutationEndpoints);
}

function initEndpoints(dao, validator, connectionDao, config) {
  const endpoints = {
    allUsers: (args, ctx) => {
      return connectionDao.all(args, ctx.user);
    },
    createUser: ({input}, ctx) => {
      return validator.validate(input).then(errors => {
        if (errors.length > 0) {
          return new Response(null, [], errors);
        }

        return dao.create(input, ctx.user);
      })
    },
    updateUser: ({id, input}, ctx) => {
      return dao.update(id, input, ctx.user);
    }
  };

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
