const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('Item', itemSchema);