const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');
const express = require('express');

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


// GET ALL CANDIDATES
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'sucess',
            data: rows
        });
    });
});

//QUERY TO GET A SINGLE DATA 'CANDIDATE'
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
    const params = [req.params.id];


    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// //QUERY TO DELETE DATA 'candidates'
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id= ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found!'
            });
        } else {
            res.json({
                message: 'delete',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// CREATE A CANDIDATE
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body,
        'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    // //QUERY TO CREATE DATA 'candidates'
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// UPDATE A CANDIDATE
app.put('/api/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE candidates SET party_id = ? WHERE id =?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // CHECK IF it was updated
        } else if (!result.affectedRows) {
            res.json({
                message: 'candidate not found :('
            });
        } else {
            res.json({
                message: 'success :)',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


//PARTIES TABLES ROUTES

app.get('/api/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get a single party
app.get('/api/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a party
app.delete('/api/party/:id', (req, res) => {

    const sql = `DELETE FROM parties WHERE id= ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            //below checks is anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found!'
            });
        } else {
            res.json({
                message: 'delete',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


//RES FOR USER REQUEST THAT ARE NOT SUPPORTED (ERR)
app.use((req, res) => {
    res.status(404).end();
});

//START THE EXPRESS.JS SERVER ON PORT #
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});