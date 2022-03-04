const mysql = require('mysql2');
const express = require('express');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3002;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CONNECT MYSQL DATABASE TO THIS SERVER.JS
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'icanCODE247365days',
    database: 'election'
},
    console.log('connected to the database!')
);

// //****DATABASE CALLS BELOW */

// // //QUERY TO GET THE WHOLE ELECTION DB
// // db.query(`SELECT * FROM candidates`, (err, rows) => {
// //     console.log(rows);
// // });

// //QUERY TO GET A SINGLE DATA 'CANDIDATE'
// db.query(`SELECT * FROM candidates WHERE id = 9`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// //QUERY TO DELETE DATA 'candidates'
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// //QUERY TO CREATE DATA 'candidates'
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// VALUES (?,?,?,?)`;

// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//RES FOR USER REQUEST THAT ARE NOT SUPPORTED (ERR)
app.use((req, res) => {
    res.status(404).end();
});

//START THE EXPRESS.JS SERVER ON PORT #
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});