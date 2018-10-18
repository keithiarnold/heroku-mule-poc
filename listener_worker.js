const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  ssl: true
});

pool.connect(function(err, client) {
  if (err) {
    console.log(err);
  }
  client.on('notification', function(msg) {
    console.log('trigger fired with: ');
    console.log(msg);

    console.log(client.query('SELECT * FROM mcsandbox.contacts WHERE Id = ' mgs.payload));
  });

  var query = client.query('LISTEN watchers');
});