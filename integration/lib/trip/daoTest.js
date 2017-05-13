const { expect } = require('chai');
const Dao = require('../../../src/trip/dao');
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

    this.db("areas").del();
    this.db(this.tableName).del();
  })

  shared.shouldBehaveLikeCrudDao();
})
