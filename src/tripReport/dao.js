const Report = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, daos, batchLoader) {
    this.db = db;
    this.daos = daos;
    this.tableName = 'trip_reports';
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
  }

  resetCache() {
    this.loader.clearAll();
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select(`${this.tableName}.*`).from(this.tableName).whereIn('trip_id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id].push(new Report(row, this.daos));
          return;
        }

        rowMap[row.trip_id] = [new Report(row, this.daos)];
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    });
  }
}

module.exports = Dao;
