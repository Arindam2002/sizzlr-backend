const mongoose = require('mongoose');
const Payment = require('./payment');
const OrderItem = require('./orderItem');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    canteenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canteen',
        required: true
    },
    items: {
        type: [OrderItem.schema],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,   // (Pending, Accepted, Rejected), (Preparing, Completed, Delivered)
        default: "Pending"
    },
    payment: {
        type: Payment.schema,
        required: true
    },

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;