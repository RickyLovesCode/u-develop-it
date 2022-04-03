const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3002;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//USE API ROUTES
app.use('/api', apiRoutes);

//RES FOR USER REQUEST THAT ARE NOT SUPPORTED (ERR)
app.use((req, res) => {
    res.status(404).end();
});

//START THE EXPRESS.JS SERVER ON PORT #
db.connect(err => {
    if (err) throw err;
    console.log('DATABASE CONNECTED.');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});