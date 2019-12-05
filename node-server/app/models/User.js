const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    pairedDevices: {
        type: Array,
        value: [{
            type: String,
        }],
        default: []
    },
    pairedAlexas: {
        type: Array,
        value: [{
            type: String,
        }],
        default: []
    },
    listOfItems: {
        type: Array,
        value: [{
            type: Number,
        }],
        default: []
    },
    outOfStock: {
        type: Array,
        value: [{
            type: Object,
            value: [{
                name: String,
                time: Number,
                priotiry: Number //1 = out of stock, 2 = soon to be out of stock, 3 = manually added, 4 = frequency of buying
            }],
        }],
        default: []
    },
    soonOutOfStock: {
        type: Array,
        value: [{
            type: Object,
            value: [{
                name: String,
                time: Number,
                priotiry: Number //1 = out of stock, 2 = soon to be out of stock, 3 = manually added, 4 = frequency of buying
            }],
        }],
        default: []
    },
    shoppingList: {
        type: Array,
        value: [{
            type: Object,
            value: [{
                name: String,
                time: Number,
                priotiry: Number //1 = out of stock, 2 = soon to be out of stock, 3 = manually added, 4 = frequency of buying
            }],
        }],
        default: []
    }
});


module.exports = mongoose.model('User', userSchema);