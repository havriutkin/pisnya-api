const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static(__dirname + '/public'));

app.get('/api/v1/', (req, res) => {
    res.json({info: 'Hello world!'});
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})