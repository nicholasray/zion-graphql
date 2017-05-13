const { createIfAuthorized, updateIfAuthorized, deleteIfAuthorized } = require('../lib/framework/auth/writeAuth');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  totalCount(opts, user) {
    return this.dao.totalCount(opts);
  }

  findById(id, user) {
    return this.dao.findById(id);
  }

  withIds(ids, user) {
    return this.dao.withIds.load(id);
  }

  all(opts, user) {
    return this.dao.all(opts);
  }

  findByEmail(email, user) {
    return this.dao.findByEmail(email);
  }

  create(input, user) {
    return this.dao.create(input);
  }

  update(id, input, user) {
    return updateIfAuthorized(input, user, this.dao);
  }

  delete(id, user) {
    return deleteIfAuthorized(id, user, this.dao)
  }
}

module.exports = Repository;
