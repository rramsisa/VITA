const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./app/routes/auth')
const raspiRoute = require('./app/routes/raspi');
const recipesRoute = require('./app/routes/recipes');
const manualRoute = require('./app/routes/manual');
const listRoute = require('./app/routes/list');
const alexaRoute = require('./app/routes/alexa');

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
app.route("/api/recipes/recipeLink")
    .post(verify, recipesRoute.GetRecipeLink)
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
app.route("/api/list/addToShoppingList")
    .post(verify, listRoute.addToShoppingList)
app.route("/api/list/moveFromOutOfStockList")
    .post(verify, listRoute.moveFromOutOfStockList)
app.route("/api/list/moveFromSoonOutOfStockList")
    .post(verify, listRoute.moveFromSoonOutOfStockList)
app.route("/api/list/removeFromShoppingList")
    .post(verify, listRoute.removeFromShoppingList)
app.route("/api/list/getOutOfStockList")
    .get(verify, listRoute.getOutOfStockList)
app.route("/api/list/clearOutOfStockList")
    .post(verify, listRoute.clearOutOfStockList)
app.route("/api/list/getSoonOutOfStockList")
    .get(verify, listRoute.getSoonOutOfStockList)
app.route("/api/list/clearSoonOutOfStockList")
    .post(verify, listRoute.clearSoonOutOfStockList)
app.route("/api/list/getShoppingList")
    .get(verify, listRoute.getShoppingList)
app.route("/api/list/clearShoppingList")
    .post(verify, listRoute.clearShoppingList)
app.route("/api/alexa/pair")
    .post(verify, alexaRoute.pairAlexa)
app.route("/api/alexa/unpair")
    .post(verify, alexaRoute.unpairAlexa)
app.route("/api/alexa/getRecipes")
    .post(alexaRoute.getRecipesFromAlexa)
app.route("/api/alexa/getShoppingList")
    .post(alexaRoute.getShoppingListFromAlexa)
app.route("/api/alexa/getItems")
    .post(alexaRoute.getMyItemsFromAlexa)
app.route("/api/alexa/modify")
    .post(alexaRoute.modifyFromAlexa)
app.route("/api/user/alexa")
    .get(verify, alexaRoute.pairedAlexas)

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