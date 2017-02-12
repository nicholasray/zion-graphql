const ValidatorJS = require('validator');
const ResponseError = require('../lib/responseError');

class Validator {
  constructor(dao, validator) {
    this.validator = validator || ValidatorJS;
    this.dao = dao;
  }

  validate(model) {
    const promises = [];
    const errors = [];

    if (!this.validator.isEmail(model.email)) {
      errors.push(new ResponseError('email', 'Email is not valid.'))
    }

    const promise = this.dao.findByEmail(model.email).then(result => {
      if (result != null) {
        errors.push(new ResponseError('email', 'Email is already registered.'));
      }
    });

    promises.push(promise);

    return Promise.all(promises).then(() => {
      return errors;
    })
  }
}

module.exports = Validator;
