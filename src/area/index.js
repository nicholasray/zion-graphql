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
      janAvgPrecip: Float
      janRecordHigh: Int
      janRecordLow: Int
      febAvgHigh: Int
      febAvgLow: Int
      febAvgPrecip: Float
      febRecordHigh: Int
      febRecordLow: Int
      marAvgHigh: Int
      marAvgLow: Int
      marAvgPrecip: Float
      marRecordHigh: Int
      marRecordLow: Int
      aprAvgHigh: Int
      aprAvgLow: Int
      aprAvgPrecip: Float
      aprRecordHigh: Int
      aprRecordLow: Int
      mayAvgHigh: Int
      mayAvgLow: Int
      mayAvgPrecip: Float
      mayRecordHigh: Int
      mayRecordLow: Int
      juneAvgHigh: Int
      juneAvgLow: Int
      juneAvgPrecip: Float
      juneRecordHigh: Int
      juneRecordLow: Int
      julyAvgHigh: Int
      julyAvgLow: Int
      julyAvgPrecip: Float
      julyRecordHigh: Int
      julyRecordLow: Int
      augAvgHigh: Int
      augAvgLow: Int
      augAvgPrecip: Float
      augRecordHigh: Int
      augRecordLow: Int
      septAvgHigh: Int
      septAvgLow: Int
      septAvgPrecip: Float
      septRecordHigh: Int
      septRecordLow: Int
      octAvgHigh: Int
      octAvgLow: Int
      octAvgPrecip: Float
      octRecordHigh: Int
      octRecordLow: Int
      novAvgHigh: Int
      novAvgLow: Int
      novAvgPrecip: Float
      novRecordHigh: Int
      novRecordLow: Int
      decAvgHigh: Int
      decAvgLow: Int
      decAvgPrecip: Float
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
