const TripImage = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, batchLoader) {
    super({db, model: TripImage, tableName: 'trip_images'});
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
  }

  create(input) {
    if (input.rank != null) {
      return super.create(input);
    }

    return this.db.transaction(trx => {
      return this.db.select(`${this.tableName}.*`).from(this.tableName).limit(1).orderBy('rank', 'desc').where({trip_id: input.trip_id}).whereNotNull('rank').transacting(trx).then(rows => {
        console.log('rows', rows);
        input = Object.assign({}, input, {rank: 1})

        if (rows.length > 0) {
          input = Object.assign({}, input, {rank: rows[0].rank + 1})
        }

        return super.create(input, trx);
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })

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
