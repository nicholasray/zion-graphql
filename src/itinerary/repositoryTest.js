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

  shared.shouldBehaveLikeWriteAuth();
})
