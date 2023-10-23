const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;