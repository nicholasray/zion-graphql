class Repository {
  constructor(dao) {
    this.dao = dao;
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
      if (trip.isPublished()) {
        return trip;
      }

      return null;
    })
  }

  related(trip, user) {
    if (user.isAdmin()) {
      return this.dao.related(trip);
    }

    return this.dao.related(trip, {isPublished: true});
  }

  all(opts, user) {
    if (user.isAdmin()) {
      return this.dao.all(opts);
    }

    return this.dao.all(Object.assign({}, opts, {isPublished: true}))
  }

  create(input, user) {
    if (user.isAdmin()) {
      return this.dao.create(input);
    }

    throw new Error("Unauthorized to perform this action.");
  }

  update(id, input, user) {
    if (user.isAdmin()) {
      return this.dao.update(input);
    }

    throw new Error("Unauthorized to perform this action.");
  }

  delete(id, user) {
    if (user.isAdmin()) {
      return this.dao.delete(id);
    }

    throw new Error("Unauthorized to perform this action.");
  }
}

module.exports = Repository;
