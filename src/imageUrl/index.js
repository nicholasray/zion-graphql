function init(config) {
  initSchema(config);
}

function initSchema(config) {
  const types = `
    type ImageUrl {
      small: String
      medium: String
      large: String
      xlarge: String
    }
  `

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
