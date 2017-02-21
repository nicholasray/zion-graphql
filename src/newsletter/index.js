const Observer = require('./observer');
const Producer = require('./producer');

function init(userDao, exchange) {
  producer = new Producer(exchange);
  userDao.addAfterSave(new Observer(producer));
}

module.exports = {
  init
}
