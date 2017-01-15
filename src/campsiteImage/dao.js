const CampsiteImage = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, batchLoader) {
    this.db = db;
    this.tableName = 'campsite_images';
    this.loader = batchLoader || new DataLoader(keys => this.withCampsiteIds(keys));
    this.builder = new Builder(db);
  }

  withCampsiteId(id) {
    return this.loader.load(id);
  }

  withCampsiteIds(ids) {
    return this.db.select(`${this.tableName}.*`).from(this.tableName).whereIn('campsite_id', ids).orderBy('rank', 'asc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.campsite_id in rowMap) {
          rowMap[row.campsite_id].push(new CampsiteImage(row));
          return;
        }

        rowMap[row.campsite_id] = [new CampsiteImage(row)];
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    });
  }
}

module.exports = Dao;
