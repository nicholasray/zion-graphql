const Builder = require('./builder');
const Connection = require('./connection');

class ConnectionDao {
  constructor(db, dao) {
    this.db = db;
    this.dao = dao;
    this.table = "trips";
  }

  all(opts) {
    const builder = new Builder(this.db);

    builder.selectCount(this.table);

    if (opts.bounds) {
      builder.withinBounds(opts.bounds);
    }

    if (opts.distance) {
      builder.withinDistance(opts.distance);
    }

    return builder.build().then((rows) => {
      return new Connection(parseInt(rows[0].count), opts, this.dao);
    })
  }
}

module.exports = ConnectionDao;
