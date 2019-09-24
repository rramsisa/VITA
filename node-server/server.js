const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./app/routes/auth')
const raspiRoute = require('./app/routes/raspi');

dotenv.config();

mongoose.Promise = global.Promise;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.json());

app.use('/api/user/', authRoute);
app.use('/api/raspi/', raspiRoute);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});