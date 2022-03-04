const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//RES FOR REQUEST THAT ARE NOT SUPPORTED (ERR)
app.use((req, res) => {
    res.status(404).end();
});

//START THE EXPRESS.JS SERVER ON PORT #
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});