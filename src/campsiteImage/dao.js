const CampsiteImage = require('./model');
const DataLoader = require('dataloader');
const CrudDao = require('../lib/framework/crudDao');
const Rankable = require('../lib/framework/rankable');

class Dao extends CrudDao {
  constructor(db, batchLoader) {
    super({db, model: CampsiteImage, tableName: 'campsite_images'})
    this.loader = batchLoader || new DataLoader(keys => this.withCampsiteIds(keys));
    this.rankable = new Rankable(db, this.tableName);
  }

  resetCache() {
    super.resetCache();
    this.loader.clearAll();
  }

  create(input) {
    return this.rankable.create(this.convertInput(input), 'campsite_id', super.create.bind(this));
  }

  update(id, input) {
    return this.rankable.update(id, this.convertInput(input), 'campsite_id', super.update.bind(this));
  }

  delete(id) {
    return this.rankable.delete(id, 'campsite_id', super.delete.bind(this));
  }

  withCampsiteId(id) {
    return this.loader.load(id);
  }

  withCampsiteIds(ids) {
    return this.db.select(`${this.tableName}.*`, 'images.filename', 'images.alt', 'images.title', 'images.caption').from(this.tableName).innerJoin('images', `${this.tableName}.image_id`, 'images.id').whereIn('campsite_id', ids).orderBy('rank', 'asc').then(rows => {
      const rowMap = {};

      rows.forEach(row => {
        if (row.campsite_id in rowMap) {
          rowMap[row.campsite_id].push(new CampsiteImage(row));
          return;
        }

        rowMap[row.campsite_id] = [new CampsiteImage(row)];
      })

      return ids.map(id => {
        return rowMap[id] ? rowMap[id] : [];
      })
    });
  }
}

module.exports = Dao;
