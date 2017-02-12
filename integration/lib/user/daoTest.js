const { expect } = require('chai');
const Dao = require('../../../src/user/dao');
const knex = require('knex')({
  debug: process.env.DEBUG || false,
  client: 'pg',
  connection: process.env.DATABASE_URL
});

describe('Dao', () => {
  var subject;

  beforeEach(() => {
    subject = new Dao(knex);
  })

  describe("#findByEmail", () => {
    context("with present email", () => {
      beforeEach(() => {
        return knex('users').del().then(() => {
          return knex.insert({email: "Keanu.Ortiz@gmail.com"}).from("users")
        })
      })

      it("return the user record", () => {
        // when
        const promise = subject.findByEmail("Keanu.Ortiz@gmail.com");

        // expect
        return promise.then(result => {
          expect(result.email()).to.equal("Keanu.Ortiz@gmail.com");
        })
      })
    })

    context("with absent email", () => {
      it("returns null", () => {
        const promise = subject.findByEmail("test@test.com")

        // expect
        return promise.then(result => {
          expect(result).to.be.null;
        })
      })
    })
  })
});
