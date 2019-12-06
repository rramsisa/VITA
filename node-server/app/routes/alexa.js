const User = require('../models/User');
const Item = require('../models/Item');
const unirest = require('unirest')
const url = "https://api.spoonacular.com/"

const {
    pairAlexaValidation,
    modifyAlexaValidation
} = require('../validation');

async function pairAlexa(req, res) {

    const {
        error
    } = pairAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    if (user.pairedAlexas.includes(req.body.alexaID)) {
        return res.status(400).send({
            message: 'Alexa already paired to this account'
        })
    }

    const listOfUsers = await User.find();
    // console.log(listOfUsers)

    for (i = 0; i < listOfUsers.length; i++) {
        // console.log(listOfUsers[i])
        if (listOfUsers[i].pairedAlexas.includes(req.body.alexaID)) {
            return res.status(400).send({
                message: 'Alexa already paired to a different account'
            })
        }
    }

    try {
        user.pairedAlexas.push(req.body.alexaID);
        const savedUser = await user.save();
        return res.send({
            message: "Alexa Added"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function unpairAlexa(req, res) {
    const {
        error
    } = pairAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    if (!user.pairedAlexas.includes(req.body.alexaID)) {
        return res.status(404).send({
            message: 'Alexa not found'
        })
    }
    var index = user.pairedAlexas.indexOf(req.body.alexaID)
    if (index > -1) {
        user.pairedAlexas.splice(index, 1);
    }

    try {
        const savedUser = await user.save();
        return res.send({
            message: "Alexa Removed"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

//get list of my alexas
async function pairedAlexas(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })

        return res.send({
            alexas: user.pairedAlexas
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

//get list of my items' object
async function getMyItemsFromAlexa(req, res) {
    const {
        error
    } = pairAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }
    try {
        const user = await User.findOne({
            pairedAlexas: req.body.alexaID
        });
        if (user == null) {
            return res.status(400).send({
                "message": "This alexa is not paired with any user. Please pair this alexa using the VITA mobile app."
            });
        }
        const values = Object.values(user.listOfItems)

        itemInfo = []
        for (var property in values) {
            const item = await Item.findOne({
                _id: values[property]
            })

            if (item.status) {
                itemInfo.push(item)
            }

        }
        return res.send(itemInfo);

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

//get shoppingList list
async function getShoppingListFromAlexa(req, res) {
    const {
        error
    } = pairAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }
    try {
        const user = await User.findOne({
            pairedAlexas: req.body.alexaID
        });
        if (user == null) {
            return res.status(400).send({
                "message": "This alexa is not paired with any user. Please pair this alexa using the VITA mobile app."
            });
        }
        // const values = Object.values(user.listOfItems)

        return res.send({
            list: user.shoppingList
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

async function getRecipesFromAlexa(req, res) {
    console.log("reached")
    const {
        error
    } = pairAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    let requestString = "recipes/findByIngredients?apiKey=" + process.env.API_KEY

    try {
        const user = await User.findOne({
            pairedAlexas: req.body.alexaID
        });
        if (user == null) {
            return res.status(400).send({
                "message": "This alexa is not paired with any user. Please pair this alexa using the VITA mobile app."
            });
        }
        console.log(typeof (user.listOfItems))
        const values = Object.values(user.listOfItems)
        // const entries = Object.entries(user.listOfItems)

        console.log(values)
        breadcrumbs = " "
        for (var property in values) {

            const item = await Item.findOne({
                _id: values[property]
            })
            if (item.status == true) {
                item.breadcrumbs.forEach(i => breadcrumbs = breadcrumbs + i + ", ");
                breadcrumbs = breadcrumbs + item.name + ", "
            }

        }
        console.log(breadcrumbs)


        unirest.get(url + requestString)
            .header("apiKey", process.env.API_KEY)
            .header('Content-Type', 'application/json')
            .query({
                "ingredients": breadcrumbs,
                "number": 5,
                "ranking": 2,
                "ignorePantry": true
            })
            .end(result => {
                console.log(result.body);
                return res.send({
                    message: result.body
                });
            })



    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

async function modifyFromAlexa(req, res) {
    const {
        error
    } = modifyAlexaValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        pairedAlexas: req.body.alexaID
    });
    if (user == null) {
        return res.status(400).send({
            "message": "This alexa is not paired with any user. Please pair this alexa using the VITA mobile app."
        });
    }

    const item = await Item.findOne({
        userID: user._id,
        name: req.body.name
    });
    // console.log(item)
    if (item != null) {
        var d = new Date();
        if (req.body.flag == 1) {
            item.quantity = parseInt(item.quantity) + parseInt(req.body.quantity)
            item.status = true;
            item.date = d.getTime();
            // console.log(d.getMilliseconds())
            for (h = 1; h <= req.body.quantity; h++) {
                item.added.push(d.getTime())
            }

        } else if (item.quantity == 0) {
            return res.status(400).send({
                "message": "Item is out of stock"
            });
        } else {
            item.quantity = parseInt(item.quantity) - parseInt(req.body.quantity)
            item.date = d.getTime();

        }
        if (item.quantity <= 0) {
            item.quantity = 0;
            item.status = false;
            var date1 = new Date();
            var Difference_In_Time = date1.getTime() - item.date;
            console.log(Difference_In_Time)
            item.lasted.push(Difference_In_Time / parseInt(req.body.quantity));
        }
        // console.log("Item exists")
        try {
            const savedItem = item.save();
            return res.send({
                item: item._id,
                message: "Quantity Updated"
            });
        } catch (err) {
            return res.status(400).send({
                message: err
            });
        }
    }


    let requestString = "https://api.spoonacular.com/food/products/classify?apiKey=" + process.env.API_KEY


    try {
        unirest.post(requestString)
            .header("apiKey", process.env.API_KEY)
            .header('Content-Type', 'application/json')
            .send({
                "title": req.body.name,
                "upc": "0",
                "plu_code": "0"

            })
            .end(result => {
                breadList = result.body.breadcrumbs

                // console.log(breadList);
                if (breadList.indexOf("non food item") >= 0) {
                    breadList = []
                }
                else if (result.body.category == null) {
                    console.log("it was null")
                    breadList = [req.body.name]
                }
                else {
                    breadList.push(result.body.category)
                }
                const newItem = new Item({
                    name: req.body.name,
                    status: true,
                    quantity: req.body.quantity,
                    userID: user._id,
                    breadcrumbs: breadList
                });
                var d = new Date();
                for (h = 1; h <= req.body.quantity; h++) {
                    newItem.added.push(d.getTime())
                }

                const savedItem = newItem.save();
                user.listOfItems.push(newItem._id);
                const savedUser = user.save();
                // console.log("saved item")
                // console.log(breadcrumbsList)
                return res.send({
                    item: newItem._id,
                    message: "Item Request received!"
                });

            })
    } catch (err) {
        console.log("caught exception")
        console.log(err)

        res.status(400).send({
            message: err
        });
        // return  err

    }
}

module.exports = {
    pairAlexa,
    unpairAlexa,
    pairedAlexas,
    getMyItemsFromAlexa,
    getRecipesFromAlexa,
    getShoppingListFromAlexa,
    modifyFromAlexa
};