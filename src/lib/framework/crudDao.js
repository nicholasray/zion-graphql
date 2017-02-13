const DataLoader = require('dataloader');
const Response = require('./response');
const _ = require("lodash");

class CrudDao {
  constructor(opts) {
    this.db = opts.db
    this.daos = opts.daos;
    this.model = opts.model;
    this.tableName = opts.tableName
    this.findByLoader = new DataLoader(keys => this.withIds(keys));
  }

  totalCount(opts) {
    return this.db.count("*").from(this.tableName).then(rows => {
      return parseInt(rows[0].count);
    });
  }

  findById(id) {
    return this.findByLoader.load(id);
  }

  withIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        rowMap[row.id] = new this.model(row, this.daos);
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : null;
      })
    })
  }

  all({limit, offset}) {
    const builder = this.db.select('*').from(this.tableName).orderBy("created_at", "desc");

    if (limit) {
      builder.limit(limit);
    }

    if (offset) {
      builder.offset(offset);
    }

    return builder.then(rows => {
      return rows.map(row => {
        return new this.model(row, this.daos);
      })
    })
  }

  create(input) {
    return this.db.insert(this.convertInput(input), '*').from(this.tableName).then(rows => {
      return new Response(new this.model(rows[0], this.daos));
    });
  }

  update(id, input) {
    return this.db.update(this.convertInput(input), '*').from(this.tableName).where('id', id).then(rows => {
      if (rows.length == 0) {
        throw new Error('no record exists with id ' + id);
      }

      return new this.model(rows[0], this.daos);
    })
  }

  convertInput(input) {
    const dbInput = {};

    for (var key in input) {
      dbInput[_.snakeCase(key)] = input[key];
    }

    return dbInput;
  }
}

module.exports = CrudDao;
