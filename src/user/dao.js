const User = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, findByLoader) {
    this.db = db;
    this.tableName = 'users';
    this.findByLoader = findByLoader || new DataLoader(keys => this.withIds(keys));
  }

  findById(id) {
    return this.findByLoader.load(id);
  }

  withIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        rowMap[row.id] = new User(row);
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : null;
      })
    })
  }
}

module.exports = Dao;
