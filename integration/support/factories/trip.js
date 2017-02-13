const knex = require('../../support/db');
const areaFactory = require('./area');

var i = 0;

function defaultAttrs(rows) {
  return {
    area_id: rows[0].id,
    slug: "slug" + rows[0].id,
  }
}

function build(attrs = {}) {
  i = i + 1;

  return areaFactory.create().then(rows => {
    return Object.assign({}, defaultAttrs(rows), attrs);
  })

}

function create(attrs = {}) {
  return build(attrs).then(builtAttrs => {
    return knex.insert(builtAttrs, "*").into("trips");
  })
}

module.exports = {
  build,
  create
};
