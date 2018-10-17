const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  ssl: true
});

console.log('Connect to db');
pool.connect();

pool.query('SELECT Name, Email FROM mcsandbox.contact ORDER BY CreatedDate LIMIT 10', function(err, contacts) {
  if (err) {
    console.error(err);
  } else {
    console.log(contacts);
  }
});

pool.end();