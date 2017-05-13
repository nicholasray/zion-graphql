const fs = require('fs');
const jwt = require('express-jwt');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const AuthUser = require('./lib/framework/auth/authUser');
const NullUser = require('./lib/framework/auth/nullUser');
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

const ImageUrl = require('./imageUrl');
const Travel = require('./travel');
const TripImage = require('./tripImage');
const Image = require('./image');
const CampsiteImage = require('./campsiteImage');
const Campsite = require('./campsite');
const TripCampsite = require('./tripCampsite');
const Itinerary = require('./itinerary');
const ItineraryPlan = require('./itineraryPlan');
const Area = require('./area');
const User = require('./user');
const TripReport = require('./tripReport');
const Trip = require('./trip');

ImageUrl.init(gqlConfig);
const { dao: travelDao } = Travel.init();
const { dao: tripImageDao } = TripImage.init(knex, gqlConfig);
const { dao: imageDao } = Image.init(knex, gqlConfig);
const { dao: campsiteImageDao } = CampsiteImage.init(knex, gqlConfig);
const { dao: campsiteDao } = Campsite.init(knex, { campsiteImageDao }, gqlConfig);
const { dao: tripCampsiteDao } = TripCampsite.init(knex, {campsiteImageDao}, gqlConfig);
const { dao: itineraryPlanDao } = ItineraryPlan.init(knex, { campsiteDao }, gqlConfig);
const { dao: itineraryDao } = Itinerary.init(knex, { itineraryPlanDao }, gqlConfig);
const { dao: areaDao } = Area.init(knex, {}, gqlConfig);
const { dao: userDao } = User.init(knex, {}, gqlConfig);
const { dao: reportDao } = TripReport.init(knex, { userDao },  gqlConfig);
const { dao: tripDao } = Trip.init(knex, { imageDao: tripImageDao, travelDao, tripCampsiteDao, itineraryDao, areaDao, reportDao }, gqlConfig);

const daos = [travelDao, tripImageDao, imageDao, campsiteImageDao, campsiteDao, itineraryPlanDao, itineraryDao, areaDao, userDao, reportDao, tripCampsiteDao, tripDao];

const Newsletter = require('./newsletter').init(userDao, channel);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(gqlConfig.getSchema());

const app = express();
app.use(cors());

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'auth.pem'));
const authorize = function() {
  return jwt({
    secret: publicKey,
    audience: ['pajfF1T8hQbAeoov9mab2t7qVcTnawx4', 'zion-api'],
    issuer: 'https://app60328304.auth0.com/',
    credentialsRequired: false,
    requestProperty: 'auth'
  })
}

app.set('port', (process.env.PORT || 8080));
app.use('/graphql', authorize(), (req, res, next) => {
  daos.forEach(dao => {
    dao.resetCache();
  })

  next();
}, graphqlHTTP(req => ({
  schema: schema,
  rootValue: gqlConfig.getEndpoints(),
  graphiql: true,
  context: {user: req.auth ? new AuthUser(req.auth) : new NullUser()}
})));

app.listen(app.get('port'));
console.log(`Running a GraphQL API server at localhost:${app.get('port')}/graphql`);
}
