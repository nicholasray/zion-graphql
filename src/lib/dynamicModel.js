class Model {
  constructor(opts) {
    this.data = opts;

    for (var key in opts) {
      if (this[key]) {
        continue;
      }

      this[key] = function() {
        return opts[key];
      }
    }
  }
}

module.exports = Model;
