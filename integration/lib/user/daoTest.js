const { expect } = require('chai');
const Dao = require('../../../src/user/dao');
const factory = require('../../support/factories/user');
const knex = require('../../support/db');
const shared = require('../framework/crudDaoTest');

describe('Dao', function() {
  var subject;

  beforeEach(function() {
    this.subject = new Dao(knex);
    this.db = knex;
    this.factory = factory;
    this.tableName = this.subject.tableName;

    return this.db(this.tableName).del();
  })

  shared.shouldBehaveLikeCrudDao();

  describe("#findByEmail", function() {
    context("with present email", function() {
      beforeEach(function() {
          return knex.insert({email: "Keanu.Ortiz@gmail.com"}).from("users")
      })

      it("return the user record", function() {
        // when
        const promise = this.subject.findByEmail("Keanu.Ortiz@gmail.com");

        // expect
        return promise.then(result => {
          expect(result.email()).to.equal("Keanu.Ortiz@gmail.com");
        })
      })
    })

    context("with absent email", function() {
      it("returns null", function() {
        const promise = this.subject.findByEmail("test@test.com")

        // expect
        return promise.then(result => {
          expect(result).to.be.null;
        })
      })
    })
  })
});
