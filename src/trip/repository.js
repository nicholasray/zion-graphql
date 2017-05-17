const { createIfAuthorized, updateIfAuthorized, deleteIfAuthorized } = require('../lib/framework/auth/writeAuth');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  addToDaos(dao) {
    return this.dao.addToDaos(dao);
  }

  resetCache() {
    return this.dao.resetCache();
  }

  totalCount(opts, user) {
    if (user.isAdmin()) {
      return this.dao.totalCount(opts);
    }

    return this.dao.totalCount(Object.assign({}, opts, {isPublished: true}))
  }

  findById(id, user) {
    if (user.isAdmin()) {
      return this.dao.findById(id);
    }

    return this.dao.findById(id).then(trip => {
      if (trip == null) {
        return null;
      }

      if (trip.isPublished()) {
        return trip;
      }

      return null;
    })
  }

  withIds(ids, user) {
    if (user.isAdmin()) {
      return this.dao.withIds(ids);
    }

    return this.dao.withIds(ids).then(trips => {
      return trips.map(trip => {
        if (trip == null) {
          return null;
        }

        if (trip.isPublished()) {
          return trip;
        }

        return null;
      })
    })
  }

  all(opts, user) {
    if (user.isAdmin()) {
      return this.dao.all(opts);
    }

    return this.dao.all(Object.assign({}, opts, {isPublished: true}))
  }

  related(trip, user) {
    if (user.isAdmin()) {
      return this.dao.related(trip);
    }

    return this.dao.related(trip, {isPublished: true});
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
