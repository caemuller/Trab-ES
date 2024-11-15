import pg from 'pg';
const {Client} = pg

const client = new Client({
    host: "localhost",
    port : 5432,
    user: "postgres",
    password: "postgres",
    database: "voluntariese"
})
client.connect();
export const dbClient = client 