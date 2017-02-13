const Edge = require('./edge');

class Connection {
  constructor(opts, dao) {
    this.opts = opts;
    this.dao = dao;
  }

  totalCount() {
    return this.dao.totalCount(this.opts);
  }

  edges() {
    return this.dao.all(this.opts).then(rows => {
      return rows.map(row => {
        return new Edge(row);
      })
    });
  }
}

module.exports = Connection;
