const {Client} = require('pg');
const event = require('events');
const util = require('util');

function DbEvent() {
  event.call(this);
}
util.inherits(DbEvent, event);
var dbEvent = new DbEvent;

dbEvent.on('watchers', (msg) => {
  console.log('Triggerd new contact');
  console.log(msg);
});

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