var config      = require('../knexfile.js');
var knex        = require('knex')(config);

knex.migrate.rollback()
.then(() => {
  return knex.migrate.latest();
}).then(() => {
  console.log("Migrations finished");
  process.exit();
})
