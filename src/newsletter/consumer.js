#!/usr/bin/env node

const amqp = require('amqplib');
const Client = require('./client');
const listId = process.env.NEWSLETTER_LIST_ID;
const exchangeName = 'create-user';

const mailClient = new Client();

amqp.connect(process.env.RABBITMQ_BIGWIG_RX_URL).then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    var ok = ch.assertExchange(exchangeName, 'fanout', {durable: false});
    ok = ok.then(function() {
      return ch.assertQueue('', {exclusive: true});
    });
    ok = ok.then(function(qok) {
      return ch.bindQueue(qok.queue, exchangeName, '').then(function() {
        return qok.queue;
      });
    });
    ok = ok.then(function(queue) {
      return ch.consume(queue, process, {noAck: true});
    });
    return ok.then(function() {
      console.log('[*] Waiting for messages. To exit press CTRL+C');
    });

    function process(msg) {
      console.log(" [x] '%s'", msg.content.toString());

      const data = JSON.parse(msg.content.toString());
      mailClient.subscribe(data, listId);
    }
  });
}).catch(console.warn);
