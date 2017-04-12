const Area = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, findByLoader) {
    this.db = db;
    this.tableName = 'areas';
    this.findByLoader = findByLoader || new DataLoader(keys => this.withIds(keys));
  }

  resetCache() {
    this.findByLoader.clearAll();
  }

  findById(id) {
    return this.findByLoader.load(id);
  }

  withIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        rowMap[row.id] = new Area(row, this.daos);
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : null;
      })
    })
  }
}

module.exports = Dao;
