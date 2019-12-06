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
        type: Number,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    barcode: { // Optional since the manual entries will not have bar codes
        type: Number,
        required: false
    },
    userID: { // User that registered the item
        type: String,
        required: true
    },
    breadcrumbs: { // List of item's simplified names
        type: [String],
        required: true
    },
    lasted: { // List of item's simplified names
        type: [Number]
    },
    added:{
        type: [Number],
        required: true
    },
    message:{
        type: String   
    }
});

module.exports = mongoose.model('Item', itemSchema);