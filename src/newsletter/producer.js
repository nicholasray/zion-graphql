class Producer {
  constructor(channel) {
    this.channel = channel;
  }

  call(user) {
    const payload = {
      id: user.id(),
      firstName: user.firstName(),
      lastName: user.lastName(),
      email: user.email(),
      newsletterSubscribedAt: user.newsletterSubscribedAt(),
    };

    return this.channel.publish('create-user', '', new Buffer(JSON.stringify(payload), { persistent: true }));
  }
}

module.exports = Producer;
