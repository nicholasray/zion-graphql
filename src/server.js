const fs = require('fs');
const jwt = require('express-jwt');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { buildSchema } = require('graphql');
const cors = require('cors');
const AuthUser = require('./lib/framework/auth/authUser');
const NullUser = require('./lib/framework/auth/nullUser');
const knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});
const helmet = require('helmet');
const jwks = require('jwks-rsa');

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
app.use(helmet());
app.use(cors({
  origin: [/http:\/\/localhost:\d+/, 'https://wildcairn.herokuapp.com', 'https://wildcairn-staging.herokuapp.com', /(?:.*\.)?outtraverse\.com$/]
}));

app.get('/status', function(req, res) {
  res.send('up');
})

const authorize = function() {
  return jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.OAUTH_JWKS_URI
    }),
    audience: [process.env.CAIRN_CLIENT_ID, 'zion-api'],
    issuer: process.env.OAUTH_ISSUER,
    algorithms: [ 'RS256' ],
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
}, bodyParser.json(), graphqlExpress(req => ({
  schema: schema,
  rootValue: gqlConfig.getEndpoints(),
  context: {user: req.auth ? new AuthUser(req.auth) : new NullUser()}
})));

if (process.env.GRAPHIQL == 'true') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));
}

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token.');
    return;
  }

  next(err);
});

app.listen(app.get('port'));
console.log(`Running a GraphQL API server at localhost:${app.get('port')}/graphql`);
}
