const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    image_url: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    serving_quantity: {
        type: String,
        trim: true,
        required: true
    },
    estimated_time: {
        type: Number,
        trim: true,
        required: true
    },
    veg: {
        type: Boolean,
        required: true
    },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
