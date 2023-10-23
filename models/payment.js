const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['UPI', 'Google Pay', 'Paytm', 'PhonePay', 'Cash'],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;