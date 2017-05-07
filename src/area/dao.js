const Area = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos) {
    super({db, daos, model: Area, tableName: 'areas'})
  }
}

module.exports = Dao;
