const mysql = require('mysql2');

//CONNECT MYSQL DATABASE TO SERVER.JS
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'icanCODE247365days',
    database: 'election'
},
    console.log('connected to the database!')
);


module.exports = db;
