var config      = require('../knexfile.js');
var knex        = require('knex')(config);

knex.migrate.rollback()
.then(() => {
  return knex.migrate.latest();
})
.then(() => {
  return knex.seed.run();
})
.then(function() {
  // migrations are finished
  console.log("Migrations and seed data done");
  process.exit();
});