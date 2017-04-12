const ItineraryPlan = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, campsiteDao, batchLoader) {
    this.db = db;
    this.tableName = 'itinerary_plans';
    this.loader = batchLoader || new DataLoader(keys => this.withItineraryIds(keys));
    this.campsiteDao = campsiteDao;
    this.builder = new Builder(db);
  }

  resetCache() {
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
          rowMap[row.itinerary_id].push(new ItineraryPlan(row, this.campsiteDao));
          return;
        }

        rowMap[row.itinerary_id] = [new ItineraryPlan(row, this.campsiteDao)];
      })


      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    })
  }
}

module.exports = Dao;
