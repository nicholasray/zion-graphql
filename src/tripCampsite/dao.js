const TripCampsite = require('./model');
const CrudDao = require('../lib/framework/crudDao');
const DataLoader = require('dataloader');
const Rankable = require('../lib/framework/rankable');

class Dao extends CrudDao {
  constructor(db, daos, loader) {
    super({db, daos, model: TripCampsite, tableName: 'trip_campsites'});
    this.loader = loader || new DataLoader(keys => this.withTripIds(keys));
    this.rankable = new Rankable(db, this.tableName);
  }

  create(input) {
    return this.rankable.create(this.convertInput(input), 'trip_id', super.create.bind(this));
  }

  update(id, input) {
    return this.rankable.update(id, this.convertInput(input), 'trip_id', super.update.bind(this));
  }

  delete(id) {
    return this.rankable.delete(id, 'trip_id', super.delete.bind(this));
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select([`${this.tableName}.*`, 'campsites.name', 'campsites.lat', 'campsites.lng', 'campsites.availability_id']).from(this.tableName).innerJoin('campsites', 'trip_campsites.campsite_id', 'campsites.id').whereIn('trip_campsites.trip_id', ids).orderBy('rank', 'asc').then(rows => {
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
