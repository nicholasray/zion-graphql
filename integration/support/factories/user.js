const knex = require('../../support/db');

var i = 0;

function defaultAttrs() {
  return {
    email: `mail${i}@test.com`,
  };
}

function build(attrs = {}) {
  i = i + 1;

  return new Promise((resolve) => {
    resolve(Object.assign({}, defaultAttrs(), attrs));
  })
}

function create(attrs = {}) {
  return build(attrs).then(builtAttrs => {
    return knex.insert(builtAttrs, "*").into("users");
  });
}

module.exports = {
  build,
  create
};
