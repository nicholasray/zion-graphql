const Edge = require('../lib/graphql/edge');

class Connection {
  constructor(opts, userDao, connectionDao) {
    this.opts = opts;
    this.userDao = userDao;
    this.connectionDao = connectionDao;
  }

  totalCount() {
    return this.connectionDao.totalCount(this.opts);
  }

  edges() {
    return this.userDao.all(this.opts).then(rows => {
      return rows.map(row => {
        return new Edge(row);
      })
    });
  }
}

module.exports = Connection;
