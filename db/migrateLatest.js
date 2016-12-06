var config      = require('../knexfile.js');
var knex        = require('knex')(config);

knex.migrate.latest();
