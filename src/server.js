var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var GraphqlConfig = require('./graphql/config');
const gqlConfig = new GraphqlConfig();
var Trip = require('./trip');
var Image = require('./image');

Trip.init(knex, gqlConfig);
Image.init(knex, gqlConfig);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Image {
    id: ID!
    tripId: ID!
    filename: String!
    url(size: String!): String!
    createdAt: String!
    updatedAt: String!
  }

  type Trip {
    id: ID!
    images:[Image]!
    lat: Float
    lng: Float
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    allImages(limit: Int, offset: Int): [Image]
    allTrips: [Trip]
  }
`);

var app = express();
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
