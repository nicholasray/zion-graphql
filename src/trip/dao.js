const Trip = require('./model');
const Builder = require('./builder');

class Dao {
  constructor(db, imageDao, travelDao) {
    this.db = db;
    this.imageDao = imageDao;
    this.travelDao = travelDao;
    this.table = "trips";
  }

  findById(id) {
    const where = Number.isInteger(parseInt(id)) ? {id} : {slug: id};
    return this.db.select("*").from(this.table).where(where).then(rows => {
      if (rows[0] == undefined) {
        return null;
      }

      return new Trip(rows[0], this.imageDao, this.travelDao);
    })
  }

  all({limit, offset, bounds, sort, distance}) {
    const builder = new Builder(this.db);

    builder.select({limit, offset, table: this.table})

    if (bounds) {
      builder.withinBounds(bounds);
    }

    if (distance) {
      builder.withinDistance(distance);
    }

    if (sort) {
      builder.orderBy(sort)
    }

    return builder.build().then(rows => {
      return rows.map((row) => {return new Trip(row, this.imageDao, this.travelDao)});
    })
  }
}

module.exports = Dao;
