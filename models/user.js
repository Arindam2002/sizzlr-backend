const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firebase_uid: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return value.match(re);
            },
            message: 'Invalid email address'
        },
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        validate: {
            validator: (value) => {
                const re = /^\d{10}$/;
                return value.match(re);
            },
            message: 'Invalid contact number'
        },
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'manager'],
        required: true
    },
    order_history: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        default: []
    },
});

// Create the user model
const User = mongoose.model('User', UserSchema);

module.exports = User;