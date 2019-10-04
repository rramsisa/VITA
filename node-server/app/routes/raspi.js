const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../models/User');
const Item = require('../models/Item');

const {
    pairPiValidation,
    barCodeValidation
} = require('../validation');

async function pair(req, res) {

    const {
        error
    } = pairPiValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    if (user.pairedDevices.includes(req.body.device)) {
        return res.status(400).send({
            message: 'Device already paired to this account'
        })
    }

    const listOfUsers = await User.find();
    // console.log(listOfUsers)

    for (i = 0; i < listOfUsers.length; i++) {
        // console.log(listOfUsers[i])
        if (listOfUsers[i].pairedDevices.includes(req.body.device)) {
            return res.status(400).send({
                message: 'Device already paired to a different account'
            })
        }
    }

    try {
        user.pairedDevices.push(req.body.device);
        const savedUser = await user.save();
        return res.send({
            message: "Device Added"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function unpair(req, res) {

    const {
        error
    } = pairPiValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    if (!user.pairedDevices.includes(req.body.device)) {
        return res.status(404).send({
            message: 'Device not found'
        })
    }
    var index = user.pairedDevices.indexOf(req.body.device)
    if (index > -1) {
        user.pairedDevices.splice(index, 1);
    }

    try {
        const savedUser = await user.save();
        return res.send({
            message: "Device Removed"
        });
    } catch (err) {
        res.status(400).send({
            message: err
        });
    }
}

async function postBarCodeData(req, res) {
    const {
        error
    } = barCodeValidation(req.body);
    if (error) {
        return res.status(422).send({
            message: error.details[0].message
        });
    }

    const user = await User.findOne({
        _id: req.user._id
    })

    // console.log(user.listOfItems);

    // TODO: Update for in and out of stock
    for (i = 0; i < user.listOfItems.length; i++) {
        // console.log(user.listOfItems[i]);
        const item = await Item.findOne({
            userID: user._id
        });
        // console.log(item == null);
        if (item != null && item.name == req.body.name) {
            if (req.body.flag == 1) {
                item.quantity = item.quantity + 1
            } else if (item.quantity == 0) {
                return res.status(400).send({
                    "message": "Item is out of stock"
                });
            } else {
                item.quantity = item.quantity - 1
            }
            if (item.quantity == 0) {
                item.status = false;
            }
            // console.log("Item exists")
            try {
                const savedItem = item.save();
                return res.send({
                    message: "Quantity Updated"
                });
            } catch (err) {
                return res.status(400).send({
                    message: err
                });
            }
        }
    }

    const newItem = new Item({
        name: req.body.name,
        status: true,
        quantity: 1,
        barCode: req.body.barCode,
        userID: user._id
    });

    // console.log("created item")

    try {
        const savedItem = await newItem.save();
        user.listOfItems.push(newItem._id);
        const savedUser = await user.save();
        // console.log("saved item")
        res.send({
            item: newItem._id,
            message: "Item Request received!"
        });
    } catch (err) {
        console.log("caught exception")

        res.status(400).send({
            message: err
        });
    }
}

async function getItems(req, res) {
    try {
        const listOfItems = await Item.find();
        return res.send(listOfItems);
    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
}


module.exports = {
    pair,
    unpair,
    postBarCodeData,
    getItems
};