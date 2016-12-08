function init(db, config) {
  initLoaders(db, config);
  initEndpoints(db, config);
}

function initLoaders(db, config) {
  return {};
}

function initEndpoints(db, config) {
  const endpoints = {
    allImages: ({limit, offset}) => {
      return db.select('*').from('images').limit(limit).offset(offset).then((rows) => {
        return rows.map((row) => {return new Image(row)});
      })
    }
  }

  config.addEndpoints(endpoints);
}

module.exports = {
  init
}
