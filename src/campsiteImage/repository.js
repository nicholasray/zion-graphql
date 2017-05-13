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

  withCampsiteId(id, user) {
    return this.dao.withCampsiteId(id);
  }

  withCampsiteIds(ids, user) {
    return this.dao.withCampsiteIds(ids);
  }

  all(opts, user) {
    return this.dao.all(opts);
  }

  create(input, user) {
    return createIfAuthorized(input, user, this.dao)
  }

  update(id, input, user) {
    return updateIfAuthorized(input, user, this.dao);
  }

  delete(id, user) {
    return deleteIfAuthorized(id, user, this.dao)
  }
}

module.exports = Repository;
