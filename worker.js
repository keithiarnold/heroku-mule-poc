const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  ssl: true,
  function(err, client, done) {
    console.log('Log Message');
    if (err) {
      console.error(err)
      process.exit(1);
    }
    client.query('SELECT * FROM mcsandbox.contact ORDER BY CreatedDate LIMIT 10', function(err, contacts) {
      if (err) {
        console.error(err);
      } else {
        console.log(contacts);
      }
    });
  }
});

pool.connect();