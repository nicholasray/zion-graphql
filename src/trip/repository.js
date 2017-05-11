class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  totalCount(opts, user) {
    if (!user.isAdmin()) {
      return this.dao.totalCount(Object.assign({}, opts, {published: true}))
    }

    return this.dao.totalCount(opts);
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
  }

  all(opts, user) {
  }
}

module.exports = Repository;
