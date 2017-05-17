const { expect } = require('chai');
const Dao = require('../../../../src/trip/dao');
const knex = require('../../support/db');
const factory = require('../../support/factories/trip');
const areaFactory = require('../../support/factories/area');
const shared = require('../framework/crudDaoTest');

describe('Dao', function() {
  var subject;

  beforeEach(function() {
    this.subject = new Dao(knex, {});
    this.db = knex;
    this.factory = factory;
    this.areaFactory = areaFactory;
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

  describe("#related", function() {
    context("when area has < 3 trips", function() {
      beforeEach(function() {
        this.ids = [];

        return this.factory.create({is_published: true}).then(rows => {
          this.ids.push(rows[0].id);
          return this.factory.create({is_published: true}).then(rows => {
            this.ids.push(rows[0].id);
            return this.factory.create({is_published: false}).then(rows => {
              this.ids.push(rows[0].id);
            })
          })
        });
      })

      it("filters unpublished records", function() {
        // when
        const promise = this.subject.related({areaId: () => 1, id: () => this.ids[0]}, {isPublished: true})

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(1);
          expect([results[0].id()]).to.include.members([this.ids[1]]);
          expect([results[0].id()]).to.not.include.members([this.ids[2]]);
        })
      })
    })

    context("when area has >= 3 trips", function() {
      beforeEach(function() {
        this.ids = [];
        this.areaId = null;

        return this.areaFactory.create().then(areas => {
          this.areaId = areas[0].id;
          const promises = [];

          for (var i = 0; i < 4; i++) {
            promises.push(
              this.factory.create({area_id: areas[0].id, is_published: true})
            );
          }

          promises.push(
            this.factory.create({area_id: areas[0].id, is_published: false})
          );

          return Promise.all(promises).then(responses => {
            this.ids = responses.map(r => {
              return r[0].id;
            })
          });
        })
      })

      it("filters unpublished records", function() {
        // when
        const promise = this.subject.related({areaId: () => this.areaId, id: () => this.ids[0]}, {isPublished: true})

        // expect
        return promise.then(results => {
          expect(results).to.have.lengthOf(3);

          results.forEach(result => {
            expect(result.isPublished()).to.be.true;
          })
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
