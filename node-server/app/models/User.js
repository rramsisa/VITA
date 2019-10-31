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
            type: Number,
        }],
        default: []
    },
    listOfItems: {
        type: Array,
        value: [{
            type: Number,
        }],
        default: []
    }
});


module.exports = mongoose.model('User', userSchema);