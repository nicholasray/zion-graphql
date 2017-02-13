class Model {
  constructor(data) {
    this.data = data;
  }

  id() {
    return this.data.id;
  }

  createdAt() {
    return this.data.created_at;
  }

  updatedAt() {
    return this.data.updated_at;
  }
}

module.exports = Model;
