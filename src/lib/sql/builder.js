const knex = require('knex')({});
const db = require('knex')({client: 'pg'});

class Builder {
  constructor(dbConn) {
    this.db = dbConn || db
  }
  select({limit, offset, table}) {
    var query = this.db.select('*').from(table);

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    return query;
  }

}

module.exports = Builder;
