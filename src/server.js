var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var knex = require('knex')({
  debug: true,
  client: 'pg',
  connection: process.env.DATABASE_URL
});
var DataLoader = require('dataloader');

const getImagesWithTripIds = (ids) => {
  return knex.select("*").from('images').whereIn('trip_id', ids).then(rows => {
    const rowMap = {};

    rows.map(row => {
      if (row.trip_id in rowMap) {
        rowMap[row.trip_id] = rowMap[row.trip_id].push(new Image(row));
      }

      rowMap[row.trip_id] = [new Image(row)];
    })


    return ids.map(id => {
      return rowMap[id] ? rowMap[id] : [];
    })
  });
}
const ImageLoader = new DataLoader(keys => getImagesWithTripIds(keys));


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
    return ImageLoader.load(this.id());
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
