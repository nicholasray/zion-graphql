class Observer {
  constructor(producer) {
    this.producer = producer;
  }

  call(user) {
    return this.producer.call(user);
  }
}

module.exports = Observer;
