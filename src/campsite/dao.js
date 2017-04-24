const Campsite = require('./model');
const DataLoader = require('dataloader');
const Builder = require('../lib/sql/builder');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos, loader) {
    super({db, daos, model: Campsite, tableName: 'campsites'})
    this.db = db;
  }
}

module.exports = Dao;
