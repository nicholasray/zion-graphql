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
  }

  related(trip, user) {
  }

  all(opts, user) {
  }
}

module.exports = Repository;
