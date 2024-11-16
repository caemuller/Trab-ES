const { Client } = require('pg');

const client = new Client({
    host: "db",
    port : 5432,
    user: "postgres",
    password: "postgres",
    database: "voluntariese"
})
client.connect();
const dbClient = client 

module.exports = {dbClient}