const { expect } = require('chai');
const Client = require('../../../src/lib/travel/client');

describe('Client', () => {
  var subject;

  beforeEach(() => {
    subject = new Client();
  })

  describe("#calculateTravel", () => {
    it("returns travel time from the origin to destination", () => {
      // when
      return subject.calculateTravel({
        origin: "Nashville, TN",
        destination: "Salt Lake City"
      })
      .then(res => {
        expect(res).to.have.property('distance');
        expect(res).to.have.deep.property('duration.value');
        expect(res.status).to.equal('OK');
      });
    })
  })

  describe("#calculateTravels", () => {
    it("returns travel time from the origin to the destinations", () => {
      // when
      return subject.calculateTravels({
        origin: "Nashville, TN",
        destinations: ["Salt Lake City", "Chicago, Illinois"]
      })
      .then(res => {
        expect(res).to.have.lengthOf(2);
        expect(res[0]).to.have.property('distance');
        expect(res[0]).to.have.deep.property('duration.value');
        expect(res[0].status).to.equal('OK');

        expect(res[1]).to.have.property('distance');
        expect(res[1]).to.have.deep.property('duration.value');
        expect(res[1].status).to.equal('OK');
      });
    })
  })
})
