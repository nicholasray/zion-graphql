const Image = require('./model');
const CrudDao = require('../lib/framework/crudDao');

class Dao extends CrudDao {
  constructor(db, daos) {
    super({db, daos, model: Image, tableName: "images"});
  }
}

module.exports = Dao;
