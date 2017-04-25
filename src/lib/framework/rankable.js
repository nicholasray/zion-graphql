class Rankable {
  constructor(db, tableName) {
    this.db = db;
    this.tableName = tableName;
  }

  create(input, parentColumn, createFunc) {
    if (input.rank != null) {
      return createFunc(input);
    }

    return this.db.transaction(trx => {
      return this.db.select(`${this.tableName}.*`).from(this.tableName).limit(1).orderBy('rank', 'desc').where({[parentColumn]: input[parentColumn]}).whereNotNull('rank').transacting(trx).then(rows => {

        input = Object.assign({}, input, {rank: 1})

        if (rows.length > 0) {
          input = Object.assign({}, input, {rank: rows[0].rank + 1})
        }

        return createFunc(input, trx);
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  }

  update(id, input, parentColumn, updateFunc) {
    return this.db.transaction(trx => {
      return this.db.select(`${this.tableName}.*`).from(this.tableName).where({id}).transacting(trx).then(rows => {
        const parentId = rows[0][parentColumn];

        if (input.rank > rows[0].rank) {
          // move lower on list
          return this.db.from(this.tableName).where({[parentColumn]: parentId}).andWhere('rank', '<=', input.rank).andWhere('rank', '>', rows[0].rank).decrement('rank', 1).transacting(trx).then(res => {
            return updateFunc(id, input, trx);
          })
        }

        if (input.rank < rows[0].rank) {
          // move higher on list
          return this.db.from(this.tableName).where({[parentColumn]: parentId}).andWhere('rank', '>=', input.rank).andWhere('rank', '<', rows[0].rank).increment('rank', 1).transacting(trx).then(res => {
            return updateFunc(id, input, trx);
          })
        }


        return updateFunc(id, input, trx);
      })
    })
  }

  delete(id, parentColumn) {
    return this.db.transaction(trx => {
      return this.db.select(`${this.tableName}.*`).from(this.tableName).where({id}).transacting(trx).then(rows => {
        const parentId = rows[0][parentColumn]

        return this.db.from(this.tableName).where({[parentColumn]: parentId}).andWhere('rank', '>', rows[0].rank).decrement('rank', 1).transacting(trx).then(res => {
          return this.baseDao.delete(id);
        })
      })
    })
  }
}

module.exports = Rankable;
