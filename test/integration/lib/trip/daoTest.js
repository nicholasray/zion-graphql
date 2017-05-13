const { expect } = require('chai');
const Dao = require('../../../../src/trip/dao');
const knex = require('../../support/db');
const factory = require('../../support/factories/trip');
const shared = require('../framework/crudDaoTest');

describe('Dao', function() {
  var subject;

  beforeEach(function() {
    this.subject = new Dao(knex, {});
    this.db = knex;
    this.factory = factory;
    this.tableName = this.subject.tableName;

    return this.db("areas").del();
  })

  describe("#all", function() {
    context("with present records", function() {
      beforeEach(function() {
        this.ids = [];

        return this.factory.create({is_published: false}).then(rows => {
          this.ids.push(rows[0].id);
          return this.factory.create({is_published: true}).then(rows => {
            this.ids.push(rows[0].id)
          })
        });
      })

      it("filters records", function() {
        // when
        const promise = this.subject.all({isPublished: true})

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(1);
          expect([results[0].id()]).to.include.members([this.ids[1]]);
        })
      })
    })
  })

  describe("#totalCount", function() {
    context("with present records", function() {
      beforeEach(function() {
        this.ids = [];

        return this.factory.create({is_published: false}).then(rows => {
          this.ids.push(rows[0].id);
        });
      })

      it("filters records", function() {
        // when
        const promise = this.subject.totalCount({isPublished: true})

        // expect
        return promise.then(results => {
          expect(results).to.eq(0);
        })
      })
    })
  })

  shared.shouldBehaveLikeCrudDao();
})
