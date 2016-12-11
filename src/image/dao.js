const Image = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, batchLoader) {
    this.db = db;
    this.tableName = 'images';
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
    this.builder = new Builder(db);
  }

  all({limit, offset}) {
    return this.builder.select({limit, offset, table: this.tableName}).then((rows) => {
      return rows.map((row) => {return new Image(row)});
    })
  }

  find(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select("*").from(this.tableName).whereIn('trip_id', ids).then(rows => {
      const rowMap = {};

      rows.map(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id] = rowMap[row.trip_id].push(new Image(row));
        }

        rowMap[row.trip_id] = [new Image(row)];
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    });
  }
}

module.exports = Dao;
