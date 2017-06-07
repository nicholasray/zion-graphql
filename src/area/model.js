const Model = require('../lib/framework/model');

class Area extends Model {
  constructor(data) {
    super(data);
  }

  name() {
    return this.data.name;
  }

  slug() {
    return this.data.slug;
  }

  lat() {
    return this.data.lat;
  }

  lng() {
    return this.data.lng;
  }

  weatherSource() {
    return this.data.weather_source;
  }

  weatherSourceLink() {
    return this.data.weather_source_link;
  }

  janAvgLow() {
    return this.data.jan_avg_low;
  }

  janAvgHigh() {
    return this.data.jan_avg_high;
  }

  janAvgPrecip() {
    return this.data.jan_avg_precip;
  }

  janRecordHigh() {
    return this.data.jan_record_high;
  }

  janRecordLow() {
    return this.data.jan_record_low;
  }

  febAvgLow() {
    return this.data.feb_avg_low;
  }

  febAvgHigh() {
    return this.data.feb_avg_high;
  }

  febAvgPrecip() {
    return this.data.feb_avg_precip;
  }

  febRecordHigh() {
    return this.data.feb_record_high;
  }

  febRecordLow() {
    return this.data.feb_record_low;
  }

  marAvgLow() {
    return this.data.mar_avg_low;
  }

  marAvgHigh() {
    return this.data.mar_avg_high;
  }

  marAvgPrecip() {
    return this.data.mar_avg_precip;
  }

  marRecordHigh() {
    return this.data.mar_record_high;
  }

  marRecordLow() {
    return this.data.mar_record_low;
  }

  aprAvgLow() {
    return this.data.apr_avg_low;
  }

  aprAvgHigh() {
    return this.data.apr_avg_high;
  }

  aprAvgPrecip() {
    return this.data.apr_avg_precip;
  }

  aprRecordHigh() {
    return this.data.apr_record_high;
  }

  aprRecordLow() {
    return this.data.apr_record_low;
  }

  mayAvgLow() {
    return this.data.may_avg_low;
  }

  mayAvgHigh() {
    return this.data.may_avg_high;
  }

  mayAvgPrecip() {
    return this.data.may_avg_precip;
  }

  mayRecordHigh() {
    return this.data.may_record_high;
  }

  mayRecordLow() {
    return this.data.may_record_low;
  }

  juneAvgLow() {
    return this.data.june_avg_low;
  }

  juneAvgHigh() {
    return this.data.june_avg_high;
  }

  juneAvgPrecip() {
    return this.data.june_avg_precip;
  }

  juneRecordHigh() {
    return this.data.june_record_high;
  }

  juneRecordLow() {
    return this.data.june_record_low;
  }

  julyAvgLow() {
    return this.data.july_avg_low;
  }

  julyAvgHigh() {
    return this.data.july_avg_high;
  }

  julyAvgPrecip() {
    return this.data.july_avg_precip;
  }

  julyRecordHigh() {
    return this.data.july_record_high;
  }

  julyRecordLow() {
    return this.data.july_record_low;
  }

  augAvgLow() {
    return this.data.aug_avg_low;
  }

  augAvgHigh() {
    return this.data.aug_avg_high;
  }

  augAvgPrecip() {
    return this.data.aug_avg_precip;
  }

  augRecordHigh() {
    return this.data.aug_record_high;
  }

  augRecordLow() {
    return this.data.aug_record_low;
  }

  septAvgLow() {
    return this.data.sept_avg_low;
  }

  septAvgHigh() {
    return this.data.sept_avg_high;
  }

  septAvgPrecip() {
    return this.data.sept_avg_precip;
  }

  septRecordHigh() {
    return this.data.sept_record_high;
  }

  septRecordLow() {
    return this.data.sept_record_low;
  }

  octAvgLow() {
    return this.data.oct_avg_low;
  }

  octAvgHigh() {
    return this.data.oct_avg_high;
  }

  octAvgPrecip() {
    return this.data.oct_avg_precip;
  }

  octRecordHigh() {
    return this.data.oct_record_high;
  }

  octRecordLow() {
    return this.data.oct_record_low;
  }

  novAvgLow() {
    return this.data.nov_avg_low;
  }

  novAvgHigh() {
    return this.data.nov_avg_high;
  }

  novAvgPrecip() {
    return this.data.nov_avg_precip;
  }

  novRecordHigh() {
    return this.data.nov_record_high;
  }

  novRecordLow() {
    return this.data.nov_record_low;
  }

  decAvgLow() {
    return this.data.dec_avg_low;
  }

  decAvgHigh() {
    return this.data.dec_avg_high;
  }

  decAvgPrecip() {
    return this.data.dec_avg_precip;
  }

  decRecordHigh() {
    return this.data.dec_record_high;
  }

  decRecordLow() {
    return this.data.dec_record_low;
  }

  createdAt() {
    return this.data.createdAt;
  }

  updatedAt() {
    return this.data.updatedAt;
  }
}

module.exports = Area;
