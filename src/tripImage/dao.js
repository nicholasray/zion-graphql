const TripImage = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, batchLoader) {
    super({db, model: TripImage, tableName: 'trip_images'});
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select(`${this.tableName}.*`, 'images.filename', 'images.alt', 'images.title', 'images.caption').from(this.tableName).innerJoin('images', `${this.tableName}.image_id`, 'images.id').whereIn('trip_id', ids).orderBy('rank', 'asc').then(rows => {
      const rowMap = {};

      console.log(rows);

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
