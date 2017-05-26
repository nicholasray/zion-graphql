var config      = require('../knexfile.js');
var knex        = require('knex')(config);

if (process.env.NODE_ENV == 'production') {
  console.log("Can't run in production");
  process.exit();
}
require('./reset')(knex)
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
