const Connection = require('./connection');

class ConnectionDao {
  constructor(dao) {
    this.dao = dao;
  }

  all(opts) {
    return new Connection(opts, this.dao);
  }
}

module.exports = ConnectionDao;
