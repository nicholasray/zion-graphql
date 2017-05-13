const { createIfAuthorized, updateIfAuthorized, deleteIfAuthorized } = require('../lib/framework/auth/writeAuth');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  resetCache() {
    return this.dao.resetCache();
  }

  addAfterSave(afterSave) {
    return this.dao.addAfterSave(afterSave);
  }

  totalCount(opts, user) {
    if (user.isAdmin()) {
      return this.dao.totalCount(opts);
    }

    return new Promise((resolve) => {
      resolve(0);
    });
  }

  findById(id, user) {
    if (user.isAdmin()) {
      return this.dao.findById(id);
    }

    return new Promise(resolve => {
      resolve(null);
    });
  }

  withIds(ids, user) {
    if (user.isAdmin()) {
      return this.dao.withIds(ids);
    }

    return new Promise(resolve => {
      resolve(ids.map(id => {
        return null;
      }));
    })
  }

  all(opts, user) {
    if (user.isAdmin()) {
      return this.dao.all(opts);
    }

    return new Promise(resolve => {
      resolve([]);
    });
  }

  findByEmail(email, user) {
    if (user.isAdmin()) {
      return this.dao.findByEmail(email);
    }

    return new Promise(resolve => {
      resolve(null);
    });
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
