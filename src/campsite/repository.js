const { createIfAuthorized, updateIfAuthorized, deleteIfAuthorized } = require('../lib/framework/auth/writeAuth');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  resetCache() {
    return this.dao.resetCache();
  }

  totalCount(opts, user) {
    return this.dao.totalCount(opts);
  }

  findById(id, user) {
    return this.dao.findById(id);
  }

  withIds(ids, user) {
    return this.dao.withIds(id);
  }

  all(opts, user) {
    return this.dao.all(opts);
  }

  create(input, user) {
    return createIfAuthorized(input, user, this.dao)
  }

  update(id, input, user) {
    return updateIfAuthorized(id, input, user, this.dao);
  }

  delete(id, user) {
    return deleteIfAuthorized(id, user, this.dao)
  }
}

module.exports = Repository;
