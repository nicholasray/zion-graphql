const Image = require('../image/model');
const Trip = require('./model');

class Dao {
  constructor(db, imageDao) {
    this.db = db;
    this.imageDao = imageDao;
    this.tableName = "trips";
  }

  all({limit, offset}) {
    return this.db.select('*').from(this.tableName).limit(limit).offset(offset).then((rows) => {
      return rows.map((row) => {return new Trip(row, this.imageDao)});
    })
  }
}

module.exports = Dao;
