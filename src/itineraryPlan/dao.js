const ItineraryPlan = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos, batchLoader) {
    super({db, daos, model: ItineraryPlan, tableName: 'itinerary_plans'});
    this.loader = batchLoader || new DataLoader(keys => this.withItineraryIds(keys));
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
  }

  withItineraryId(id) {
    return this.loader.load(id);
  }

  withItineraryIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('itinerary_id', ids).orderBy('day', 'ASC').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.itinerary_id in rowMap) {
          rowMap[row.itinerary_id].push(new ItineraryPlan(row, this.daos));
          return;
        }

        rowMap[row.itinerary_id] = [new ItineraryPlan(row, this.daos)];
      })


      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    })
  }
}

module.exports = Dao;
