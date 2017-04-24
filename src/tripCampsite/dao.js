const TripCampsite = require('./model');
const CrudDao = require('../lib/framework/crudDao');
const DataLoader = require('dataloader');

class Dao extends CrudDao {
  constructor(db, daos, loader) {
    super({db, daos, model: TripCampsite, tableName: 'trip_campsites'});
    this.loader = loader || new DataLoader(keys => this.withTripIds(keys));
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select([`${this.tableName}.*`, 'campsites.name', 'campsites.lat', 'campsites.lng']).from(this.tableName).innerJoin('campsites', 'trip_campsites.campsite_id', 'campsites.id').whereIn('trip_campsites.trip_id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id].push(new TripCampsite(row, this.daos));
          return;
        }

        rowMap[row.trip_id] = [new TripCampsite(row, this.daos)];
      })


      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    })
  }
}

module.exports = Dao;
