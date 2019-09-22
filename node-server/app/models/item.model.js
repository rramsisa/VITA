const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);

