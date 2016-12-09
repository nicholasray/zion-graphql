const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const GqlConfig = require('./graphql/config');
const gqlConfig = new GqlConfig();

const Trip = require('./trip');
const Image = require('./image');
Trip.init(knex, gqlConfig);
Image.init(knex, gqlConfig);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(gqlConfig.getSchema());

const app = express();
app.set('port', (process.env.PORT || 8080));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: gqlConfig.getEndpoints(),
  graphiql: true,
  context: {
    dataLoaders: gqlConfig.getLoaders(),
  }
}));
app.listen(app.get('port'));
console.log(`Running a GraphQL API server at localhost:${app.get('port')}/graphql`);
