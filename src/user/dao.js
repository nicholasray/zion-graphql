const User = require('./model');
const Response = require('./response');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');
const CrudDao = require('../lib/framework/crudDao');
const _ = require("lodash");

class Dao extends CrudDao {
  constructor(db, daos, findByLoader) {
    super({db, daos, model: User, tableName: "users"});
  }

  findByEmail(email) {
    return this.db.select('*').from(this.tableName).where({ email }).then(rows => {
      if (rows.length == 0) {
        return null;
      }

      return new this.model(rows[0]);
    })
  }
}

module.exports = Dao;
