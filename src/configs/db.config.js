const Pool = require("pg").Pool;


const env = process.env;
const db = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
})

module.exports = db;