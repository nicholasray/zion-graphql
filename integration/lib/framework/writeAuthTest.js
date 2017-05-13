const { expect } = require('chai');
const sinon = require('sinon');

exports.shouldBehaveLikeWriteAuth = function() {
  describe("#create", function() {
    var subject;

    beforeEach(function() {
      var dao = {create: function() {}}
      sinon.stub(dao, "create").resolves({});
      subject = new this.subject(dao)
    })

    context("with admin user", function() {
      it("permits creation", function() {
        // when
        const resp = subject.create({}, this.authenticated)

        // expect
        return expect(resp).to.eventually.eql({});
      })
    })

    context("with unauthenticated user", function() {
      it("throws error", function() {
        // expect
        return expect(function() {subject.create({}, this.unauthenticated)}).to.throw(Error)
      })
    })
  })

  describe("#update", function() {
    var subject;

    beforeEach(function() {
      var dao = {update: function() {}}
      sinon.stub(dao, "update").resolves({});

      subject = new this.subject(dao)
    })

    context("with admin user", function() {
      it("permits update", function() {
        // when
        const resp = subject.update(1, {}, this.authenticated)

        // expect
        return expect(resp).to.eventually.eql({});
      })
    })

    context("with unauthenticated user", function() {
      it("throws error", function() {
        // expect
        return expect(function() {subject.update(1, {}, this.unauthenticated)}).to.throw(Error)
      })
    })
  })

  describe("#delete", function() {
    var subject;

    beforeEach(function() {
      var dao = {delete: function() {}}
      sinon.stub(dao, "delete").resolves({});

      subject = new this.subject(dao)
    })

    context("with admin user", function() {
      it("permits deletion", function() {
        // when
        const resp = subject.delete(1, this.authenticated)

        // expect
        return expect(resp).to.eventually.eql({});
      })
    })

    context("with unauthenticated user", function() {
      it("throws error", function() {
        // expect
        return expect(function() {subject.delete({}, this.unauthenticated)}).to.throw(Error)
      })
    })
  })

}
