const { expect } = require('chai');
const Producer = require('./producer');
const sinon = require('sinon');

describe('Producer', () => {
  var subject;

  describe('#call', function() {
    it("delegates to exchange to publish", function() {
      // given
      const mock = {publish: sinon.spy()};
      subject = new Producer(mock);

      // when
      subject.call({
        id: () => 1,
        firstName: () => "foo",
        lastName: () => "bar",
        email: () => 'foo@example.com',
        newsletterSubscribedAt: () => 123,
      });

      // expect
      const expected = new Buffer(JSON.stringify({
        id: 1,
        firstName: "foo",
        lastName: "bar",
        email: 'foo@example.com',
        newsletterSubscribedAt: 123,
      }));
      expect(mock.publish.calledOnce).to.be.true
      expect(mock.publish.calledWith('create-user', '', expected)).to.be.true
    })
  })
})
