const Image = require('../image/model');
const Trip = require('./model');
const Builder = require('../lib/sql/builder');

class Dao {
  constructor(db, imageDao, travelDao) {
    this.db = db;
    this.imageDao = imageDao;
    this.travelDao = travelDao;
    this.tableName = "trips";
    this.builder = new Builder(db);
  }

  all({limit, offset, bounds, sort}) {
    var query = this.builder.select({limit, offset, table: this.tableName})

    if (bounds) {
      query.where('lat', '>', bounds.seLat).andWhere('lng', '>', bounds.nwLng).andWhere('lat', '<', bounds.nwLat).andWhere('lng', '<', bounds.seLng);
    }

    sort.forEach(sorter => {
      if (sorter == "FEATURED") {
        query.orderBy('created_at', 'desc');
      }

      if (sorter == "DISTANCE") {
        query.orderBy('distance', 'asc');
      }

      if (sorter == "DISTANCE_DESC") {
        query.orderBy('distance', 'desc');
      }
    })

    return query.then((rows) => {
      return rows.map((row) => {return new Trip(row, this.imageDao, this.travelDao)});
    })
  }
}

module.exports = Dao;
