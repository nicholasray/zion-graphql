const Image = require('../image/model');
const Trip = require('./model');

class Dao {
  constructor(db, imageDao) {
    this.db = db;
    this.imageDao = imageDao;
    this.tableName = "trips";
  }

  all({limit, offset, bounds}) {
    var query = this.db.select('*').from(this.tableName);

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    if (bounds) {
      query.where('lat', '>', bounds.seLat).andWhere('lng', '>', bounds.nwLng).andWhere('lat', '<', bounds.nwLat).andWhere('lng', '<', bounds.seLng);
    }

    return query.then((rows) => {
      return rows.map((row) => {return new Trip(row, this.imageDao)});
    })
  }
}

module.exports = Dao;
