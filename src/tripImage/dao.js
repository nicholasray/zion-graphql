const TripImage = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');
const Rankable = require('../lib/framework/rankable');

class Dao extends CrudDao {
  constructor(db, batchLoader) {
    super({db, model: TripImage, tableName: 'trip_images'});
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
    this.rankable = new Rankable(db, this.tableName);
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
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

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select('*').from(`${this.tableName}_view`).whereIn('trip_id', ids).orderBy('rank', 'asc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id].push(new TripImage(row));
          return;
        }

        rowMap[row.trip_id] = [new TripImage(row)];
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    });
  }
}

module.exports = Dao;
