const Client = require('../lib/travel/client');
const DataLoader = require('dataloader');
const _ = require('lodash');

class Dao {
  constructor(client, batchLoader) {
    this.client = client || new Client();
    this.loader = batchLoader || new DataLoader(keys => {
      const destinations = keys.map(key => {
        return key.destination;
      })

      return this.all({
        origin: keys[0].origin,
        destinations
      })
    }, {
      cacheKeyFn: (key) => {
        return `${key.origin}|${key.destination}`;
      }
    })
  }

  all({origin, destinations}) {
    return this.client.calculateTravels({
      origin,
      destinations
    }).then(res => {
      return res.map(r => {
        if (r.status != "OK") {
          return null;
        }

        return r.duration.value
      });
    })
  }

  find({origin, destination}) {
    return this.loader.load({origin, destination});
  }
}

module.exports = Dao;
