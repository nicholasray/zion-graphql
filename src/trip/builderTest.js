const { expect } = require('chai');
const Builder = require('./builder');

describe('Builder', () => {
  var subject;

  beforeEach(() => {
    subject = new Builder();
  })

  describe("#selectCount", () => {
    it("returns a select count statement", () => {
      const result = subject.selectCount("trips");

      // expect
      expect(result.build().toString()).to.equal('select count(*) from "trips"');
    })
  })

  describe("#withinBounds", () => {
    it("returns bounds sql statement", () => {
      const result = subject.select({table: "trips"}).withinBounds({
        nwLat: 5,
        nwLng: 10,
        seLat: 15,
        seLng: 20
      });


      // expect
      expect(result.build().toString()).to.equal('select * from "trips" where "lat" > 15 and "lng" > 10 and "lat" < 5 and "lng" < 20');
    })
  })

  describe("#orderBy", () => {
    context("with FEATURED", () => {
      it("returns correct order statement", () => {
        const result = subject.select({table: "trips"}).orderBy(["FEATURED"]);

        // expect
        expect(result.build().toString()).to.equal('select * from "trips" order by "created_at" desc');
      })
    })

    context("with DISTANCE", () => {
      it("returns correct order statement", () => {
        const result = subject.select({table: "trips"}).orderBy(["DISTANCE"]);

        // expect
        expect(result.build().toString()).to.equal('select * from "trips" order by "distance" asc');
      })
    })

    context("with DISTANCE_DESC", () => {
      it("returns correct order statement", () => {
        const result = subject.select({table: "trips"}).orderBy(["DISTANCE_DESC"]);

        // expect
        expect(result.build().toString()).to.equal('select * from "trips" order by "distance" desc');
      })
    })
  })
})
