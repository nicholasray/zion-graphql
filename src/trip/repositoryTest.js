const { expect } = require('chai');
const Repository = require('./repository');
const sinon = require('sinon');

describe('Repository', () => {
  var subject;
  var dao;
  var unauthenticated;
  var authenticated;

  beforeEach(() => {
    unauthenticated = {isAdmin: () => {}};
    authenticated = {isAdmin: () => {}};
    sinon.stub(unauthenticated, 'isAdmin').returns(false);
    sinon.stub(authenticated, 'isAdmin').returns(true);
  })

  describe("#totalCount", () => {
    beforeEach(() => {
      var dao = {totalCount: () => {}}
      var stub = sinon.stub(dao, "totalCount").resolves(1)
      stub.withArgs({published: true}).returns(1);
      stub.withArgs({}).returns(2);

      subject = new Repository(dao)
    })

    context("with unauthenticated user", () => {
      it("returns count of all published trips", () => {
        // when
        const resp = subject.totalCount({}, unauthenticated)

        // expect
        expect(resp).to.equal(1)
      })
    })

    context("with authenticated user", () => {
      it("returns count of all trips", () => {
        // when
        const resp = subject.totalCount({}, authenticated)

        // expect
        expect(resp).to.equal(2);
      })
    })
  })

  describe("#findById", () => {
    beforeEach(() => {
      var dao = {findById: () => {}}
      var stub = sinon.stub(dao, "findById").resolves({name: "model"})
      subject = new Repository(dao)
    })

    context("with authenticated user", () => {
      it("returns unpublished trip", () => {
      })
    })
  })
});
