const Edge = require('./edge');

class Connection {
  constructor(opts, dao) {
    this.opts = opts;
    this.dao = dao;
  }

  totalCount(_, ctx) {
    return this.dao.totalCount(this.opts, ctx.user);
  }

  edges(_, ctx) {
    return this.dao.all(this.opts, ctx.user).then(rows => {
      return rows.map(row => {
        return new Edge(row);
      })
    });
  }
}

module.exports = Connection;
