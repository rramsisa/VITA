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
    pairedDevices: [{
        type: Number,
    }],
    listOfItems: [{
        type: Number,
    }]
})

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: { // true => in-stock, false => out-of-stock
        type: Boolean,
        required: true
    },
    date: { // Date created
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    barcode: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Item', itemSchema);