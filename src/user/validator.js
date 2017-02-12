const ValidatorJS = require('validator');
const ResponseError = require('../lib/responseError');

class Validator {
  constructor(dao, validator) {
    this.validator = validator || ValidatorJS;
    this.dao = dao;
  }

  validate(model) {
    const errors = [];
    if (!this.validator.isEmail(model.email)) {
      errors.push(new ResponseError('email', 'Email is not valid.'))
    }

    return errors;
  }
}

module.exports = Validator;
