/*
    TODO:

    3. Implement routes for song
    5. SET UP MULTER
    6. Implement file receiving functionality
    7. Implement pages
    8. Read about bodyParser
    9. Comment controllers code
    10. Test gernre route
*/

/* ------------ Require External Dependencies ------------ */
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/configs/db.config");
const multer = require('multer');

/* ------------ Require Routers ------------ */
const artistRouter = require("./src/routes/artist.route");
const genreRouter = require("./src/routes/genre.route");
const albumRouter = require("./src/routes/album.route");

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

app.use('/artist', artistRouter);   // Registrate artist router
app.use('/genre', genreRouter);     // Registrate genre router
app.use('/album', albumRouter);     // Registrate album router


/* ------------ Error Handler Middleware ------------ */

app.use((err, req, res, next) => {
    console.log(err); // Log the error
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})