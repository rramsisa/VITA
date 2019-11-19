const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./app/routes/auth')
const raspiRoute = require('./app/routes/raspi');
const recipesRoute = require('./app/routes/recipes');
const manualRoute = require('./app/routes/manual');
const listRoute = require('./app/routes/list');

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
    .get(verify, recipesRoute.GetRecipe)
app.route("/api/user/")
    .get(authRoute.getUsers);
app.route("/api/items/")
    .get(raspiRoute.getItems);
app.route("/api/item/")
    .post(verify, raspiRoute.getItem);
app.route("/api/myitems/")
    .get(verify, raspiRoute.getMyItems);
app.route("/api/findMyItem")
    .post(verify, raspiRoute.findMyItems)
app.route("/api/myitemsInfo/")
    .get(verify, raspiRoute.getMyItemsInfo);
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
    .post(raspiRoute.postBarCodeData)
app.route("/api/manual")
    .post(verify, manualRoute.manual)
app.route("/api/user/scanner")
    .get(verify, raspiRoute.pairedScanners)
app.route("/api/item/deleteItem")
    .post(verify, raspiRoute.deleteItem)
app.route("/api/list")
    .get(verify, listRoute.getList)


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