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
    this.afterSaves = [];
  }

  resetCache() {
    this.findByLoader.clearAll();
  }

  addAfterSave(afterSave) {
    this.afterSaves.push(afterSave);
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

  create(input, trx = null) {
    let q = this.db.insert(this.convertInput(input), '*').from(this.tableName);

    if (trx != null) {
      q.transacting(trx);
    }

    return q.then(rows => {
      const node = new this.model(rows[0], this.daos);

      this.afterSaves.map(afterSave => {
        afterSave.call(node);
      });

      return new Response(node, this.daos);
    });
  }

  update(id, input, trx = null) {
    let q = this.db.update(this.convertInput(input), '*').from(this.tableName).where('id', id)

    if (trx != null) {
      q.transacting(trx);
    }

    return q.then(rows => {
      if (rows.length == 0) {
        throw new Error('no record exists with id ' + id);
      }

      const node = new this.model(rows[0], this.daos);

      return new Response(node, this.daos);
    })
  }

  delete(id) {
    return this.db.from(this.tableName).where('id', id).del().then(res => {
      return id;
    });
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
