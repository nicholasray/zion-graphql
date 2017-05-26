var config      = require('../knexfile.js');
var knex        = require('knex')(config);

require('./reset')(knex)
.then(() => {
  return knex.migrate.latest();
}).then(() => {
  console.log("Migrations finished");
  process.exit();
})
