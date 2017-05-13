const { expect } = require('chai');
const AuthUser = require('./authUser');

describe('AuthUser', () => {
  var subject;

  describe("#isAdmin", () => {
    context("when token has admin role", () => {
      it("returns true", () => {
        // given
        const s = new AuthUser({roles: ['admin']})

        // expect
        expect(s.isAdmin()).to.be.true
      })
    })

    context("when token does not have admin role", () => {
      it("returns true", () => {
        // given
        const s = new AuthUser({roles: ['blah']})

        // expect
        expect(s.isAdmin()).to.be.false
      })
    })

    context("when token has write scope", () => {
      it("returns true", () => {
        // given
        const s = new AuthUser({scope: 'write'})

        // expect
        expect(s.isAdmin()).to.be.true
      })
    })

    context("when token does not have write scope", () => {
      it("returns true", () => {
        // given
        const s = new AuthUser({scope: 'blah'})

        // expect
        expect(s.isAdmin()).to.be.false
      })
    })

    context("when token does not have write scope or admin role", () => {
      it("returns false", () => {
        // given
        const s = new AuthUser({})

        // expect
        expect(s.isAdmin()).to.be.false
      })
    })
  })
})
