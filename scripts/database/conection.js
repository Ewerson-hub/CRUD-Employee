
const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_NAME = 'company'

async function createDatabase() {
    const tempConnection = await mysql.createConnection({
        host:process.env.DB_LOGIN,
        user:process.env.DB_USER,
        password: process.env.DB_PASS,
    })

    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await tempConnection.query(`USE ${DB_NAME}`);
    await tempConnection.query(`
        CREATE TABLE IF NOT EXISTS employee (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            sector VARCHAR(255) NOT NULL
        );  
    `)
    await tempConnection.end();
}

createDatabase();

const pool = mysql.createPool({
    host : process.env.DB_LOGIN,
    database : DB_NAME,
    user : process.env.DB_USER, 
    password: process.env.DB_PASS,

    waitForConnections:true,
    connectionLimit: 10
})




module.exports = pool;

