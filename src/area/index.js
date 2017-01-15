const Dao = require('./dao');

function init(db, config) {
  const dao = new Dao(db);
  initSchema(config);

  return {
    dao
  }
}

function initSchema(config) {
  const types= `
    type Area {
      id: ID!
      name: String
      lat: Float
      lng: Float
      janAvgHigh: Int
      janAvgLow: Int
      janAvgPrecip: Int
      janRecordHigh: Int
      janRecordLow: Int
      febAvgHigh: Int
      febAvgLow: Int
      febAvgPrecip: Int
      febRecordHigh: Int
      febRecordLow: Int
      marAvgHigh: Int
      marAvgLow: Int
      marAvgPrecip: Int
      marRecordHigh: Int
      marRecordLow: Int
      aprAvgHigh: Int
      aprAvgLow: Int
      aprAvgPrecip: Int
      aprRecordHigh: Int
      aprRecordLow: Int
      mayAvgHigh: Int
      mayAvgLow: Int
      mayAvgPrecip: Int
      mayRecordHigh: Int
      mayRecordLow: Int
      juneAvgHigh: Int
      juneAvgLow: Int
      juneAvgPrecip: Int
      juneRecordHigh: Int
      juneRecordLow: Int
      julyAvgHigh: Int
      julyAvgLow: Int
      julyAvgPrecip: Int
      julyRecordHigh: Int
      julyRecordLow: Int
      augAvgHigh: Int
      augAvgLow: Int
      augAvgPrecip: Int
      augRecordHigh: Int
      augRecordLow: Int
      septAvgHigh: Int
      septAvgLow: Int
      septAvgPrecip: Int
      septRecordHigh: Int
      septRecordLow: Int
      octAvgHigh: Int
      octAvgLow: Int
      octAvgPrecip: Int
      octRecordHigh: Int
      octRecordLow: Int
      novAvgHigh: Int
      novAvgLow: Int
      novAvgPrecip: Int
      novRecordHigh: Int
      novRecordLow: Int
      decAvgHigh: Int
      decAvgLow: Int
      decAvgPrecip: Int
      decRecordHigh: Int
      decRecordLow: Int
      createdAt: String!
      updatedAt: String!
    }
  `

  config.addSchemaTypesAndEndpoints(types, '');
}

module.exports = {
  init
}
