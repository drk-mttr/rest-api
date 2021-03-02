const mongoose = require('mongoose');

// schema for item in shoppinglist
const itemSchema = new mongoose.Schema({ name: { type: String, required: true }});

// schema for shoppinglist
const shoppinglistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    items: {
        type: [itemSchema]
    }
});

module.exports = mongoose.model('Shoppinglist', shoppinglistSchema);