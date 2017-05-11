const chai = require('chai');
const chaiPromise = require('chai-as-promised');
chai.use(chaiPromise)
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
      var stub = sinon.stub(dao, "totalCount")
      stub.withArgs({isPublished: true}).resolves(1);
      stub.withArgs({}).resolves(2);

      subject = new Repository(dao)
    })

    context("with unauthenticated user", () => {
      it("returns count of all published trips", () => {
        // when
        const resp = subject.totalCount({}, unauthenticated)

        // expect
        expect(resp).to.eventually.equal(1)
      })
    })

    context("with admin user", () => {
      it("returns count of all trips", () => {
        // when
        const resp = subject.totalCount({}, authenticated)

        // expect
        expect(resp).to.eventually.equal(2);
      })
    })
  })

  describe("#findById", () => {
    beforeEach(() => {
      var dao = {findById: () => {}}
      var stub = sinon.stub(dao, "findById");
      stub.withArgs(1).resolves({id: 1, isPublished: () => false});
      stub.withArgs(2).resolves({id: 2, isPublished: () => true});
      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns unpublished trip", () => {
        // when
        const unpublishedResp = subject.findById(1, authenticated)

        // expect
        return expect(unpublishedResp).to.eventually.have.property('id', 1)
      })

      it("returns published trip", () => {
        // when
        const publishedResp = subject.findById(2, authenticated)

        // expect
        return expect(publishedResp).to.eventually.have.property('id', 2)
      })
    })

    context("with unauthenticated user", () => {
      it("returns null when finding unpublished trip", () => {
        // when
        const unpublishedResp = subject.findById(1, unauthenticated)
        // expect
        return expect(unpublishedResp).to.eventually.equal(null);
      })

      it("returns published trip", () => {
        // when
        const publishedResp = subject.findById(2, unauthenticated)

        // expect
        return expect(publishedResp).to.eventually.have.property('id', 2);
      })
    })
  })

  describe("#related", () => {
    beforeEach(() => {
      var dao = {related: () => {}}
      var stub = sinon.stub(dao, "related");
      stub.withArgs({}).resolves([{id: 1}, {id: 2}])
      stub.withArgs({}, {isPublished: true}).resolves([{id: 1}])

      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns published and unpublished trips", () => {
        // when
        const resp = subject.related({}, authenticated)

        // expect
        return expect(resp).to.eventually.have.lengthOf(2)
      })
    })

    context("with unauthenticated user", () => {
      it("returns published trips", () => {
        // when
        const resp = subject.related({}, unauthenticated)

        // expect
        return expect(resp).to.eventually.have.lengthOf(1)
      })
    })
  })

  describe("#all", () => {
    beforeEach(() => {
      var dao = {all: () => {}}
      var stub = sinon.stub(dao, "all");
      stub.withArgs({}).resolves([{id: 1}, {id: 2}])
      stub.withArgs({isPublished: true}).resolves([{id: 1}])

      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns published and unpublished trips", () => {
        // when
        const resp = subject.all({}, authenticated)

        // expect
        return expect(resp).to.eventually.have.lengthOf(2)
      })
    })

    context("with unauthenticated user", () => {
      it("returns published trips", () => {
        // when
        const resp = subject.all({}, unauthenticated)

        // expect
        return expect(resp).to.eventually.have.lengthOf(1)
      })
    })
  })

});
