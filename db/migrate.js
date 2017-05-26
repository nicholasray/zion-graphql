var config      = require('../knexfile.js');
var knex        = require('knex')(config);

return knex.migrate.latest().then(() => {
  console.log("Migrations finished");
  process.exit();
})
