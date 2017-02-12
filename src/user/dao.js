const User = require('./model');
const Response = require('./response');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');
const _ = require("lodash");

class Dao {
  constructor(db, daos, findByLoader) {
    this.db = db;
    this.daos = daos;
    this.tableName = 'users';
    this.findByLoader = findByLoader || new DataLoader(keys => this.withIds(keys));
  }

  findById(id) {
    return this.findByLoader.load(id);
  }

  findByEmail(email) {
    return this.db.select('*').from(this.tableName).where({ email }).then(rows => {
      if (rows.length == 0) {
        return null;
      }

      return new User(rows[0]);
    })
  }

  all({limit, offset}) {
    const builder = this.db.select('*').from(this.tableName)

    if (limit) {
      builder.limit(limit);
    }

    if (offset) {
      builder.offset(offset);
    }

    return builder.then(rows => {
      return rows.map(row => {
        return new User(row, this.daos);
      })
    })
  }

  withIds(ids) {
    return this.db.select('*').from(this.tableName).whereIn('id', ids).orderBy('updated_at', 'desc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        rowMap[row.id] = new User(row, this.daos);
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : null;
      })
    })
  }

  create(input) {
    return this.db.insert(this.convertInput(input), '*').from(this.tableName).then(rows => {
      return new Response(new User(rows[0], this.daos));
    });
  }

  update(id, input) {
    return this.db.update(this.convertInput(input), '*').from(this.tableName).where('id', id).then(rows => {
      if (rows.length == 0) {
        throw new Error('no record exists with id ' + id);
      }

      return new User(rows[0], this.daos);
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

module.exports = Dao;
