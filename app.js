/*
    TODO:

    3. Implement routes for songs
    4. Implement pages
    5. SET UP MULTER
    6. Read about bodyParser
*/

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/configs/db.config");
const multer = require('multer');


const artistRouter = require("./src/routes/artist.route");


const app = express();
const upload = multer();
const port = 3000;


/* ------------ Parsing Middleware ------------ */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(upload.array()); // For parsing multipart/form-data

/* ------------ Static Middleware ------------ */
app.use(express.static(__dirname + '/public'));



/* ------------ Use routers ------------ */

app.get('/', (req, res) => {
    res.json({msg: 'Ok'});
})

app.use('/artist', artistRouter);   // Attach artist router


/* ------------ Error Handler Middleware ------------ */

app.use((err, req, res, next) => {
    console.log(err); // Log the error
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})