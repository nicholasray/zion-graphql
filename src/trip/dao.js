const Trip = require('./model');
const Builder = require('./builder');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos) {
    super({db, daos, model: Trip, tableName: "trips"});
  }

  addToDaos(dao) {
    this.daos = Object.assign({}, this.daos, dao);
  }

  getDaos() {
    return this.daos;
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

    const isPublished = opts.isPublished;
    if (isPublished != undefined) {
      builder.filter(this.convertInput({isPublished}));
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

      return new Trip(rows[0], this.getDaos());
    })
  }

  related(trip, filter = {}) {
    return this.db.select('*').from(this.tableName).where(Object.assign({}, {area_id: trip.areaId()}, this.convertInput(filter))).whereNot({id: trip.id()}).limit(3).orderBy('created_at', 'desc').then(rows => {
      var trips = rows.map(row => new Trip(row, this.getDaos()))

      if (trips.length < 3) {
        return this.db.select('*').from(this.tableName).where(this.convertInput(filter)).whereNot({id: trip.id()}).limit(3).orderBy('created_at').then(rows => {
          return rows.map(row => new Trip(row, this.getDaos()));
        })
      }

      return trips;
    })
  }

  all({limit, offset, bounds, sort, distance, isPublished}) {
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

    if (isPublished != undefined) {
      builder.filter(this.convertInput({isPublished}));
    }

    return builder.build().then(rows => {
      return rows.map((row) => {return new Trip(row, this.getDaos())});
    })
  }
}

module.exports = Dao;
