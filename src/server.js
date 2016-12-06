var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});


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

class Image {
  constructor(data) {
    this.data = data;
  }

  id() {
    return this.data.id;
  }

  tripId() {
    return this.data.trip_id;
  }

  filename() {
    return this.data.filename
  }

  url({size}) {
    return `www.s3.com/${size}/${this.filename()}`
  }

  createdAt() {
    return this.data.created_at
  }
}

class Trip {
  constructor(data) {
    this.data = data
  }

  id() {
    return this.data.id;
  }

  lat() {
    return this.data.lat;
  }

  lng() {
    return this.data.lng
  }

  images() {
    return knex.select('*').from('images').where({trip_id: this.id()}).then((rows) => {
      return rows.map((row) => {return new Image(row)});
    });
  }
}


// The root provides the top-level API endpoints
var root = {
  allTrips: () => {
    return knex.select('*').from('trips').then((rows) => {
      return rows.map((row) => {return new Trip(row)});
    })
  },
  allImages: ({limit, offset}) => {
    return knex.select('*').from('images').limit(limit).offset(offset).then((rows) => {
      return rows.map((row) => {return new Image(row)});
    })
  }
}

var app = express();
app.set('port', (process.env.PORT || 8080));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(app.get('port'));
console.log(`Running a GraphQL API server at localhost:${app.get('port')}/graphql`);
