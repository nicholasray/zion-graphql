const Edge = require('../lib/graphql/edge');

class Connection {
  constructor(count, opts, dao) {
    this.count = count;
    this.opts = opts
    this.dao = dao;
  }

  totalCount() {
    return this.count;
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
