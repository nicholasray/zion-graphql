const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const GqlConfig = require('./lib/graphql/config');
const gqlConfig = new GqlConfig();

const Travel = require('./travel');
const Image = require('./image');
const Campsite = require('./campsite');
const Itinerary = require('./itinerary');
const ItineraryPlan = require('./itineraryPlan');
const Trip = require('./trip');

const { dao: travelDao } = Travel.init();
const { dao: imageDao } = Image.init(knex, gqlConfig);
const { dao: campsiteDao } = Campsite.init(knex, gqlConfig);
const { dao: itineraryPlanDao } = ItineraryPlan.init(knex, campsiteDao, gqlConfig);
const { dao: itineraryDao } = Itinerary.init(knex, itineraryPlanDao, gqlConfig);
Trip.init(knex, imageDao, travelDao, campsiteDao, itineraryDao, gqlConfig);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(gqlConfig.getSchema());

const app = express();
app.use(cors());
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
