const Itinerary = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, itineraryPlanDao, batchLoader) {
    this.db = db;
    this.tableName = 'itineraries';
    this.itineraryPlanDao = itineraryPlanDao;
    this.loader = batchLoader || new DataLoader(keys => this.withTripIds(keys));
    this.builder = new Builder(db);
  }

  resetCache() {
    this.loader.clearAll();
  }

  withTripId(id) {
    return this.loader.load(id);
  }

  withTripIds(ids) {
    return this.db.select(`${this.tableName}.*`).from(this.tableName).whereIn('trip_id', ids).leftJoin('itinerary_plans', 'itinerary_plans.itinerary_id', 'itineraries.id').groupBy(`${this.tableName}.id`).orderByRaw('count(itinerary_plans.id) ASC').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.trip_id in rowMap) {
          rowMap[row.trip_id].push(new Itinerary(row, this.itineraryPlanDao));
          return;
        }

        rowMap[row.trip_id] = [new Itinerary(row, this.itineraryPlanDao)];
      });


      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      });
    })
  }
}

module.exports = Dao;
