const { expect } = require('chai');
const Builder = require('./builder');

describe('Builder', () => {
  var subject;

  beforeEach(() => {
    subject = new Builder();
  })

  describe("#select", () => {
    context("when given only table name", () => {
      it("returns select statement when given only table name", () => {
        // when
        const result = subject.select({table: 'houses'});

        // expect
        expect(result.toString()).to.equal('select * from "houses"')
      })
    })

    context("when given limit", () => {
      it("returns select with limit", () => {
        // when
        const result = subject.select({table: 'houses', limit: 5});

        // expect
        expect(result.toString()).to.equal('select * from "houses" limit 5');
      })
    })

    context("when given offset", () => {
      it("returns select with offset", () => {
        // when
        const result = subject.select({table: 'houses', offset: 1});

        // expect
        expect(result.toString()).to.equal('select * from "houses" offset 1');
      })
    })

    context("when given offset and limit", () => {
      it("returns select with limit and offset", () => {
        // when
        const result = subject.select({table: 'houses', limit: 5, offset: 1});

        // expect
        expect(result.toString()).to.equal('select * from "houses" limit 5 offset 1');
      })
    })
  })
})
