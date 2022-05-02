const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to E9xpense Manager"});
});

require('./routes/user.routes')(app);
require('./routes/expense.routes')(app);
require('./routes/dashboard.routes')(app);
require('./routes/reports.routes')(app);

app.listen(process.env.NODE_PORT, () => {
    console.log("Server is listening on port ",process.env.NODE_PORT);
});