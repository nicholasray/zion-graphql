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
    context("with invalid date", () => {
      it("returns an error", () => {
        const promise = subject.validate({
          email: 'test@example.com',
          newsletterSubscribedAt: 'foo'
        })

        return promise.then(result => {
          // expect
          expect(result).to.not.be.empty;
          expect(result[0].key).to.equal('newsletterSubscribedAt');
          expect(result[0].message).to.equal('Newsletter subscribed at must be a valid date.');
        })
      })
    })

    context("with valid date", () => {
      it("returns no error", () => {
        const promise = subject.validate({
          email: 'test@example.com',
          newsletterSubscribedAt: new Date().toISOString()
        })

        return promise.then(result => {
          // expect
          expect(result).to.be.empty
        })
      })
    })

    context("with blank email", () => {
      it("returns an error", () => {
        const promise = subject.validate({
          email: ''
        })

        return promise.then(result => {
          // expect
          expect(result).to.not.be.empty;
          expect(result[0].key).to.equal('email');
          expect(result[0].message).to.equal('Email cannot be blank.');
        });
      })
    })

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
