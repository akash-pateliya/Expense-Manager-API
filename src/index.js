const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()

let corsOptions = {
    origin: "http://localhost:3000"
};

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Expense Manager"});
});

require('./routes/user.routes')(app);

app.listen(process.env.NODE_PORT, () => {
    console.log("Server is listening on port ",process.env.NODE_PORT);
});