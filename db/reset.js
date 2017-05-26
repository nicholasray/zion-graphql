module.exports = function(knex) {
  return knex.raw('DROP SCHEMA public CASCADE;').then(function() {
    return knex.raw('CREATE SCHEMA public');
  }).then(function() {
    return knex.raw('GRANT ALL ON SCHEMA public TO postgres;');
  }).then(function() {
    return knex.raw('GRANT ALL ON SCHEMA public TO public;');
  });
}
