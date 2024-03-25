
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host : process.env.DB_LOGIN,
    database : 'My_company',
    user : 'root', 
    password: process.env.DB_PASS,

    waitForConnections:true,
    connectionLimit: 10
})

module.exports = pool;

