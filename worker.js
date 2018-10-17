const {Client} = require('pg')
const client = new Client()

await client.connect()

const res = await createInterface.query('SELECT * FROM mcsandbox.contact ORDER BY CreatedDate LIMIT 10')
console.log(res.rows)
await client.end()