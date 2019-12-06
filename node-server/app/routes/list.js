const User = require('../models/User');
const Item = require('../models/Item');
const unirest = require('unirest')

//--------------------------
//clear outOfStock
async function clearOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        user.outOfStock = [];
        const savedUser = await user.save();
        return res.send({
            message: "list cleared"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//clear soonOutOfStock
async function clearSoonOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        user.soonOutOfStock = [];
        const savedUser = await user.save();
        return res.send({
            message: "list cleared"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//clear shoppingList
async function clearShoppingList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)
        user.shoppingList = [];
        const savedUser = await user.save();
        return res.send({
            message: "list cleared"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//get outOfStock list
async function getOutOfStockList(req, res) {
     try {
        const user = await User.findOne({
            _id: req.user._id
        })
        const values = Object.values(user.listOfItems)

        itemInfo = []
        itemInfoprint = []

        for (var property in values) {
            const item = await Item.findOne({
                _id: values[property]
            })
           if (item.status == false) {
                itemInfo.push(item)
           }
            itemInfoprint.push(item)

        }
        console.log("---")
        console.log(itemInfoprint)
        console.log("---")

        return res.send(itemInfo);

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//get soonOutOfStock list
async function getSoonOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        // const values = Object.values(user.listOfItems)

        return res.send({
            list: user.soonOutOfStock
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//get shoppingList list
async function getShoppingList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
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
//move element from list -- requires name
async function moveFromOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })

        var item = user.outOfStock.filter(obj => {
            return obj.name === req.body.name
        })
        if (item.length > 0) {
            console.log(req.body.name)
            user.outOfStock.splice(user.outOfStock.indexOf(item[0]), 1)
            var item2 = user.shoppingList.filter(obj => {
                return obj.name === req.body.name
            })
            if (item2.length > 0) {
                user.shoppingList.splice(user.shoppingList.indexOf(item2[0]), 1)
                item2[0].priotiry = item[0].priotiry
                item2[0].time = item[0].time
                user.shoppingList.push(item2[0])
            }
            else {
                user.shoppingList.push(item[0])
            }
        }
        const savedUser = await user.save();
        return res.send({
            message: "removed from outOfStock list"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//move element from soonOutOfStock list -- requires name
async function moveFromSoonOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })

        var item = user.soonOutOfStock.filter(obj => {
            return obj.name === req.body.name
        })
        if (item.length > 0) {
            console.log(req.body.name)
            user.soonOutOfStock.splice(user.soonOutOfStock.indexOf(item[0]), 1)
            var item2 = user.shoppingList.filter(obj => {
                return obj.name === req.body.name
            })
            if (item2.length > 0) {
                user.shoppingList.splice(user.shoppingList.indexOf(item2[0]), 1)
                item2[0].priotiry = item[0].priotiry
                item2[0].time = item[0].time
                user.shoppingList.push(item2[0])
            }
            else {
                var temp = { name: item[0].name, time: item[0].time, priotiry: 2 };
                user.shoppingList.push(temp)
            }
        }
        const savedUser = await user.save();
        return res.send({
            message: "removed from soonOutOfStock list"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//remove element from shoppingList -- requires name
async function removeFromShoppingList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })

        var item = user.shoppingList.filter(obj => {
            return obj.name === req.body.name
        })
        if (item.length > 0) {
            console.log(req.body.name)
            user.shoppingList.splice(user.shoppingList.indexOf(item[0]), 1)
        }
        const savedUser = await user.save();
        return res.send({
            message: "removed from shopping list"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}
//add element to list -- requires name
async function addToShoppingList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })

        var item = user.shoppingList.filter(obj => {
            return obj.name === req.body.name
        })

        if (item.length == 0) {
            console.log(req.body.name)
            console.log("manual add")
            var temp = { name: req.body.name, priotiry: 3 };
            user.shoppingList.push(temp)

        }
        else {
            return res.send({
                message: "item already on shopping list"
            });
        }

        const savedUser = await user.save();
        return res.send({
            message: "added to shopping list to get"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

//refresh list of my items' names
async function refreshOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        const values = Object.values(user.listOfItems)
        user.outOfStock = []
        for (var property in values) {
            const item = await Item.findOne({
                _id: values[property]
            })
            console.log(item.name)
            if (user.outOfStock.includes(item.name)) {
                continue;

            }
            if (item.status == false) {
                console.log("out of stock")
                var date1 = new Date();
                var t = date1.getTime() - item.date
                var temp = { name: item.name, time: t, priotiry: 1 };
                console.log(temp.name)
                console.log(item.name)
                user.outOfStock.push(temp)
            }

        }
        const savedUser = await user.save();
        return res.send({
            message: "list refreshed"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

//refresh list of my items' names
async function refreshSoonOutOfStockList(req, res) {
    try {
        const user = await User.findOne({
            _id: req.user._id
        })
        const values = Object.values(user.listOfItems)
        console.log("--------")
        user.soonOutOfStock = []
        for (var property in values) {
            const item = await Item.findOne({
                _id: values[property]
            })
            console.log(item.name)
            if (user.soonOutOfStock.includes(item.name)) {
                continue;

            }
            if (item.status != false) {
                var total_lasted = 0;
                for (var i = 0; i < item.lasted.length; i++) {
                    total_lasted = total_lasted + item.lasted[i]
                }
                var avg_lasted = total_lasted / item.lasted.length;
                
                var date1 = new Date();
               if (date1.getTime() - item.date > avg_lasted) {

                    var t = (date1.getTime() - item.date) - avg_lasted
                    var temp = { name: item.name, time: t, priotiry: 2 };
                    console.log(item.name)
                    user.soonOutOfStock.push(temp)
                }
                else if(item.added.length > 1){
                    var total_added = 0;
                    for (var i = 0; i < item.added.length-1; i++) {
                        total_added = total_added + Math.abs(item.added[i+1]-item.added[i])
                    }
                    var avg_added = total_added / item.added.length;
                                        console.log(avg_added)

                    if(avg_added <= date1.getTime() - item.added[item.added.length-1]){
                        var t = (date1.getTime() - item.date) - avg_lasted
                        var temp = { name: item.name, time: avg_added, priotiry: 4 };
                        console.log(item.name)
                        user.soonOutOfStock.push(temp)
                    }
                
                }
            }
        }
        const savedUser = await user.save();
        return res.send({
            message: "list refreshed"
        });

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}

module.exports = {
    clearOutOfStockList, clearSoonOutOfStockList, clearShoppingList,
    getOutOfStockList, getSoonOutOfStockList, getShoppingList,
    moveFromOutOfStockList, moveFromSoonOutOfStockList, removeFromShoppingList,
    addToShoppingList, refreshOutOfStockList, refreshSoonOutOfStockList
};