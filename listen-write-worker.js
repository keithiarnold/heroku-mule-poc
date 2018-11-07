const { Client } = require('pg');
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

    /*request('https://www.google.com', function(error, response, body) {
    if (error) {
        console.log(error);
    }
        console.log('Got it');
    });*/

    client.query('BEGIN', (error) => {
        if (error) {
            console.log(error);
            return;
        } else {
            var herokuTestSubscriptionId = 'a204B000000HcFv';
            client.query('INSERT INTO mcsandbox.subscriber__c ($1, $3, $5) VALUES ($2, $4, $6) ', ['Contact__c', record.sfid, 
                    'Subscription__c', herokuTestSubscriptionId, 
                    'Subscriber_Status__c', 'Subscribed'], (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    client.query('COMMIT', (error) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Transaction success');
                        }
                        return;
                    });
                }
            });
        }
    });
});