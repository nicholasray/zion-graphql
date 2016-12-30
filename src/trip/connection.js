const Edge = require('../lib/graphql/edge');

class Connection {
  constructor(opts, tripDao, connectionDao) {
    this.opts = opts
    this.tripDao = tripDao;
    this.connectionDao = connectionDao;
  }

  totalCount() {
    return this.connectionDao.totalCount(this.opts);
  }

  edges() {
    return this.tripDao.all(this.opts).then(rows => {
      return rows.map(row => {
        return new Edge(row);
      })
    });
  }
}

module.exports = Connection;
