const mongoose = require("mongoose")

const munuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    is_drink: {
        type: String,
        default: false
    },
    ingredients: {
        type: String,
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    },
})

const menuItem = mongoose.model('menuItem', munuItemSchema);

module.exports= menuItem;