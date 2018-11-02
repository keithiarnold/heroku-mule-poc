const {Client} = require('pg');
const event = require('events');
const util = require('util');
const request = require('request');

const client = new Client({
  connectionString: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  ssl: true
});

client.connect(function(err, client) {
  if (err) {
    console.log(err);
  }

  client.on('notification', function(msg) {
    let payload = JSON.parse(msg.payload);
    dbEvent.emit(msg.channel, payload);
  })

  client.query('LISTEN new_contact');
});

function DbEvent() {
  event.call(this);
}
util.inherits(DbEvent, event);
var dbEvent = new DbEvent;

dbEvent.on('new_contact', (record) => {
  console.log('Triggerd new contact: ');
  console.log(record);

  request('https://www.google.com', function(error, response, body) {
  if (error) {
    console.log(error);
  }
    console.log('Got it');
  });
});