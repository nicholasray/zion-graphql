const Campsite = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, campsiteImageDao, batchLoader, findByLoader) {
    this.db = db;
    this.tableName = 'campsites';
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
    this.findByLoader = findByLoader || new DataLoader(keys => this.withIds(keys));
    this.builder = new Builder(db);
    this.campsiteImageDao = campsiteImageDao;
  }

  findById(id) {
    return this.findByLoader.load(id);
  }

  withIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        rowMap[row.id] = new Campsite(row, this.campsiteImageDao);
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : null;
      })
    })
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select([`${this.tableName}.*`, 'trip_campsites.trip_id']).from(this.tableName).innerJoin('trip_campsites', 'trip_campsites.campsite_id', 'campsites.id').whereIn('trip_campsites.trip_id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id].push(new Campsite(row, this.campsiteImageDao));
          return;
        }

        rowMap[row.trip_id] = [new Campsite(row, this.campsiteImageDao)];
      })


      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    })
  }
}

module.exports = Dao;
