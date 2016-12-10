const Image = require('../image/model');
const Trip = require('./model');

class Dao {
  constructor(db, imageDao) {
    this.db = db;
    this.imageDao = imageDao;
    this.tableName = "trips";
  }

  all(opts) {
    return this.db.select('*').from(this.tableName).then((rows) => {
      return rows.map((row) => {return new Trip(row, this.imageDao)});
    })
  }
}

module.exports = Dao;
