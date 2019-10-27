const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./app/routes/auth')
const raspiRoute = require('./app/routes/raspi');
const recipesRoute = require('./app/routes/recipes');
const verify = require('./app/routes/verifyToken').validateToken;



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

app.route("/api/recipes/recipe")
    .get(recipesRoute.recipe)
app.route("/api/recipes/simplify")
    .post(recipesRoute.get_basic_pantry_item_name)

app.route("/api/user/")
    .get(authRoute.getUsers);
app.route("/api/item/")
    .get(raspiRoute.getItems);
app.route("/api/myitem/")
    .get(verify, raspiRoute.getMyItems);
app.route("/api/user/login")
    .post(authRoute.login);
app.route("/api/user/register")
    .post(authRoute.register);
app.route("/api/user/deleteUser")
    .post(verify, authRoute.deleteUser);
app.route("/api/user/changePassword")
    .post(verify, authRoute.changePassword);
app.route("/api/raspi/pair")
    .post(verify, raspiRoute.pair)
app.route("/api/raspi/unpair")
    .post(verify, raspiRoute.unpair)
app.route("/api/raspi/postBarCodeData")
    .post(verify, raspiRoute.postBarCodeData1)



// listen for requests
const server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});



function stop() {
    server.close(() => {
        process.exit(0);

    });
}
module.exports = {
    app
};
module.exports.stop = stop;