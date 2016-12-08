var Image = require('../image/model');

const getImagesWithTripIds = (ids, db) => {
  return db.select("*").from('images').whereIn('trip_id', ids).then(rows => {
    const rowMap = {};

    rows.map(row => {
      if (row.trip_id in rowMap) {
        rowMap[row.trip_id] = rowMap[row.trip_id].push(new Image(row));
      }

      rowMap[row.trip_id] = [new Image(row)];
    })


    return ids.map(id => {
      return rowMap[id] ? rowMap[id] : [];
    })
  });
}

module.exports = {
  getImagesWithTripIds
}
