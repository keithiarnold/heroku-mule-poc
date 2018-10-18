const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_NAVY_URL,
  ssl: true
});

pool.connect();

pool.on('notification', function(msg) {
  console.log(msg);
});

pool.query('LISTEN watchers', function(err, contacts) {
  if (err) {
    console.error(err);
  } else {
    console.log(contacts);
  }
});