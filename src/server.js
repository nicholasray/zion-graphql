const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});

function initConnection() {
  return require('amqplib').connect(process.env.RABBITMQ_BIGWIG_TX_URL).then(conn => {
    return conn.createChannel().then(ch => {
      return ch.assertExchange('create-user', 'fanout', {durable: true}).then(() => {
        return ch;
      })
    })
  }).catch(console.warn);
}

init();

async function init() {
  const channel = await initConnection();

const GqlConfig = require('./lib/graphql/config');
const gqlConfig = new GqlConfig();

const Travel = require('./travel');
const Image = require('./image');
const CampsiteImage = require('./campsiteImage');
const Campsite = require('./campsite');
const Itinerary = require('./itinerary');
const ItineraryPlan = require('./itineraryPlan');
const Area = require('./area');
const User = require('./user');
const TripReport = require('./tripReport');
const Trip = require('./trip');

const { dao: travelDao } = Travel.init();
const { dao: imageDao } = Image.init(knex, gqlConfig);
const { dao: campsiteImageDao } = CampsiteImage.init(knex, gqlConfig);
const { dao: campsiteDao } = Campsite.init(knex, campsiteImageDao, gqlConfig);
const { dao: itineraryPlanDao } = ItineraryPlan.init(knex, campsiteDao, gqlConfig);
const { dao: itineraryDao } = Itinerary.init(knex, itineraryPlanDao, gqlConfig);
const { dao: areaDao } = Area.init(knex, gqlConfig);
const { dao: userDao } = User.init(knex, {}, gqlConfig);
const { dao: reportDao } = TripReport.init(knex, { userDao },  gqlConfig);
Trip.init(knex, { imageDao, travelDao, campsiteDao, itineraryDao, areaDao, reportDao }, gqlConfig);

const Newsletter = require('./newsletter').init(userDao, channel);

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
}
