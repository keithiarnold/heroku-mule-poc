var pg = require ('pg');

var connectionString = process.env.HEROKU_POSTGRESQL_NAVY_URL

pg.connect(pgConString, function(err, client) {
  if (err) {
    console.log(err);
  }
  client.on('notification', function(msg) {
    console.log(msg);
  });
  var query = client.query("LISTEN watchers");
});