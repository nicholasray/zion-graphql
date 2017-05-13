const chai = require('chai');
const chaiPromise = require('chai-as-promised');
chai.use(chaiPromise)
const { expect } = require('chai');
const Repository = require('./repository');
const sinon = require('sinon');
const shared = require('../../test/unit/support/writeAuthTest');

describe('Repository', () => {
  var subject;
  var dao;
  var unauthenticated;
  var authenticated;

  beforeEach(function() {
    unauthenticated = {isAdmin: () => {}};
    authenticated = {isAdmin: () => {}};
    sinon.stub(unauthenticated, 'isAdmin').returns(false);
    sinon.stub(authenticated, 'isAdmin').returns(true);
    this.subject = Repository;
    this.authenticated = authenticated;
    this.unauthenticated = unauthenticated;
  })

  describe("#totalCount", function() {
    beforeEach(() => {
      var dao = {totalCount: () => {}}
      sinon.stub(dao, "totalCount").resolves(2);

      subject = new Repository(dao)
    })

    context("with unauthenticated user", () => {
      it("returns null", () => {
        // when
        const resp = subject.totalCount({}, unauthenticated)

        // expect
        return expect(resp).to.eventually.eql(0)
      })
    })

    context("with admin user", () => {
      it("returns count of all users", () => {
        // when
        const resp = subject.totalCount({}, authenticated)

        // expect
        return expect(resp).to.eventually.equal(2);
      })
    })
  })

  describe("#findById", function() {
    beforeEach(() => {
      var dao = {findById: () => {}}
      var stub = sinon.stub(dao, "findById").resolves({
        id: 1
      });

      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns user", () => {
        // when
        const resp = subject.findById(1, authenticated)

        // expect
        return expect(resp).to.eventually.have.property('id', 1)
      })
    })

    context("with unauthenticated user", () => {
      it("returns null", () => {
        // when
        const resp = subject.findById(1, unauthenticated)

        // expect
        return expect(resp).to.eventually.equal(null);
      })
    })
  })

  describe("#withIds", () => {
    beforeEach(() => {
      var dao = {withIds: () => {}}
      var stub = sinon.stub(dao, "withIds").resolves([{id: 1}, {id: 2}]);
      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns users", () => {
        // when
        const resp = subject.withIds([1, 2], authenticated);

        // expect
        return expect(resp).to.eventually.have.lengthOf(2);
      })
    })

    context("with unauthenticated user", () => {
      it("returns array of nulls", () => {
        // when
        const resp = subject.withIds([1, 2], unauthenticated)
        // expect
        return resp.then(r => {
          expect(r.length).to.eql(2);
          expect(r[0]).to.eql(null);
          expect(r[1]).to.eql(null);
        })
      })
    })
  })

  describe("#all", () => {
    beforeEach(() => {
      var dao = {all: () => {}}
      sinon.stub(dao, "all").resolves([{id: 1}, {id: 2}]);

      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns users", () => {
        // when
        const resp = subject.all([1, 2], authenticated);

        // expect
        return expect(resp).to.eventually.have.lengthOf(2);
      })
    })

    context("with unauthenticated user", () => {
      it("returns empty array", () => {
        // when
        const resp = subject.all([1, 2], unauthenticated)
        // expect

        return resp.then(r => {
          expect(r.length).to.eql(0);
        })
      })
    })
  })

  describe("#findByEmail", () => {
    beforeEach(() => {
      var dao = {findByEmail: () => {}}
      sinon.stub(dao, "findByEmail").resolves({id: 1});

      subject = new Repository(dao)
    })

    context("with admin user", () => {
      it("returns users", () => {
        // when
        const resp = subject.findByEmail('blah@mail.com', authenticated);

        // expect
        return expect(resp).to.eventually.have.property('id', 1);
      })
    })

    context("with unauthenticated user", () => {
      it("returns empty array", () => {
        // when
        const resp = subject.findByEmail('blah@gmail.com', unauthenticated)

        // expect
        return expect(resp).to.eventually.eql(null);
      })
    })
  })

  shared.shouldBehaveLikeUpdateAuth();
  shared.shouldBehaveLikeDeleteAuth();
})
