const Builder = require('./builder');
const Connection = require('./connection');

class ConnectionDao {
  constructor(db, tripDao) {
    this.db = db;
    this.tripDao = tripDao;
    this.table = "trips";
  }

  totalCount(opts) {
    const builder = new Builder(this.db);

    builder.selectCount(this.table);

    if (opts.bounds) {
      builder.withinBounds(opts.bounds);
    }

    if (opts.distance) {
      builder.withinDistance(opts.distance);
    }

    return builder.build().then(rows => {
      return parseInt(rows[0].count);
    })
  }

  all(opts) {
    return new Connection(opts, this.tripDao, this);
  }
}

module.exports = ConnectionDao;
