var config      = require('../knexfile.js');
var knex        = require('knex')(config);

knex.migrate.latest()
.then(function() {
  return knex.seed.run();
})
.then(function() {
  // migrations are finished
  console.log("Migrations and seed data done")
});
