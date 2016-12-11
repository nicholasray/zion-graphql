const GoogleClient = require('@google/maps');

class Client {
  constructor(googleClient) {
    this.googleClient = googleClient || GoogleClient.createClient({
      key: process.env.GOOGLE_API_KEY,
      Promise: Promise
    });
  }

  calculateTravel({origin, destination}) {
    return this.calculateTravels({
      origin: origin,
      destinations: [destination]
    })
    .then(res => {
      return res[0];
    });
  }

  calculateTravels({origin, destinations}) {
    return this.googleClient.distanceMatrix({
      origins: [origin],
      destinations
    })
    .asPromise()
    .then(res => {
      return res.json.rows[0].elements;
    });
  }
}

module.exports = Client;
