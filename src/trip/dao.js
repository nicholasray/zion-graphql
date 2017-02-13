const Trip = require('./model');
const Builder = require('./builder');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos) {
    super({db, daos, model: Trip, tableName: "trips"});
  }

  totalCount(opts) {
    const builder = new Builder(this.db);

    builder.selectCount(this.tableName);

    if (opts.bounds) {
      builder.withinBounds(opts.bounds);
    }

    if (opts.distance) {
      builder.withinDistance(opts.distance);
    }

    return builder.build().then(rows => {
      return parseInt(rows[0].count);
    })
  }

  findById(id) {
    const where = Number.isInteger(parseInt(id)) ? {id} : {slug: id};
    return this.db.select("*").from(this.tableName).where(where).then(rows => {
      if (rows[0] == undefined) {
        return null;
      }

      return new Trip(rows[0], this.daos);
    })
  }

  all({limit, offset, bounds, sort, distance}) {
    const builder = new Builder(this.db);

    builder.select({limit, offset, table: this.tableName})

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
      return rows.map((row) => {return new Trip(row, this.daos)});
    })
  }
}

module.exports = Dao;
