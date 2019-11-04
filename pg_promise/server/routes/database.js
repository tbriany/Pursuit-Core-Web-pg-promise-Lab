
const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/pg_promise_db"
const db = pgp(connectionString)


module.exports = db; 