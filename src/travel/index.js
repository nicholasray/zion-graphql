const Dao = require('./dao');

function init() {
  const dao = new Dao();

  return {
    dao
  }
}

module.exports = {
  init
}
