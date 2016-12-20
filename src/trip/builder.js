const SelectBuilder = require('../lib/sql/builder');
const db = require('knex')({client: 'pg'});

class Builder {
  constructor(dbConn) {
    this.selectBuilder = new SelectBuilder(dbConn);
    this.query = dbConn || db;
  }

  select(opts) {
    this.query = this.selectBuilder.select(opts)
    return this;
  }

  selectCount(table) {
    this.query = this.query.count("*").from(table);
    return this;
  }

  withinBounds(bounds) {
    this.query = this.query.where('lat', '>', bounds.seLat).andWhere('lng', '>', bounds.nwLng).andWhere('lat', '<', bounds.nwLat).andWhere('lng', '<', bounds.seLng);
    return this;
  }

  orderBy(sorters) {
    sorters.forEach(sorter => {
      if (sorter == "FEATURED") {
        this.query = this.query.orderBy('created_at', 'desc');
      }

      if (sorter == "DISTANCE") {
        this.query = this.query.orderBy('distance', 'asc');
      }

      if (sorter == "DISTANCE_DESC") {
        this.query = this.query.orderBy('distance', 'desc');
      }
    })

    return this;
  }

  build() {
    return this.query;
  }
}

module.exports = Builder;
