const { expect } = require('chai');
const Validator = require('./validator');

describe('Validator', () => {
  var subject;

  beforeEach(() => {
    subject = new Validator();
  })

  describe('#validate', () => {
    context("with invalid email", () => {
      it("returns empty array of errors", () => {
        // when
        const result = subject.validate({
          email: 'abc'
        })

        // expect
        expect(result).to.not.be.empty;
        expect(result[0].key).to.equal('email');
        expect(result[0].message).to.equal('Email is not valid.');
      })
    })

    context("with valid email", () => {
      it("returns empty array of errors", () => {
        // when
        const result = subject.validate({
          email: 'abc@example.com'
        })

        // expect
        expect(result).to.be.empty;
      })
    })
  })
})
