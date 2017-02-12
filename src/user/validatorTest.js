const { expect } = require('chai');
const Validator = require('./validator');

describe('Validator', () => {
  var subject;

  beforeEach(() => {
    const dao = { findByEmail: function() {
      return new Promise((resolve, reject) => {
        return resolve(null);
      });
    } }
    subject = new Validator(dao);
  })

  describe('#validate', () => {
    context("with invalid email", () => {
      it("returns an error", () => {
        // when
        const promise = subject.validate({
          email: 'abc'
        })

        return promise.then(result => {
          // expect
          expect(result).to.not.be.empty;
          expect(result[0].key).to.equal('email');
          expect(result[0].message).to.equal('Email is not valid.');
        });
      })
    })

    context("with valid email", () => {
      it("returns empty array of errors", () => {
        // when
        const promise = subject.validate({
          email: 'abc@example.com'
        })

        // expect
        return promise.then(result => {
          expect(result).to.be.empty;
        });
      })
    })

    context("with duplicate email", () => {
      beforeEach(() => {
        const dao = { findByEmail: function() {
          return new Promise((resolve, reject) => {
            return resolve({email: "test@example.com"});
          });
        } }

        subject = new Validator(dao)
      })

      it("returns an error", () => {
        // when
        const promise = subject.validate({
          email: "abc@example.com"
        })

        // expect
        return promise.then(result => {
          expect(result).to.not.be.empty;
          expect(result[0].key).to.equal('email');
          expect(result[0].message).to.equal('Email is already registered.');
        })
      })
    })
  })
})
