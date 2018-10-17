const { Client } = require('pg')
const client = new Client()

client.connect()

client.query('SELECT * FROM mcsandbox.contact ORDER BY CreatedDate LIMIT 10', (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})