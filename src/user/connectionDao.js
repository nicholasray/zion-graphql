const Connection = require('./connection');

class ConnectionDao {
  constructor(db, userDao) {
    this.db = db;
    this.userDao = userDao;
    this.table = "users";
  }

  totalCount(opts) {
    return this.db.count("*").from(this.table).then(rows => {
      return parseInt(rows[0].count);
    });
  }

  all(opts) {
    return new Connection(opts, this.userDao, this);
  }
}

module.exports = ConnectionDao;
