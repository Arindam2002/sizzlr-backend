const mongoose = require('mongoose');
const MenuItem = require('./menuItem');

const canteenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // institute: {
    //     // type: String,   // type: mongoose.SchemaType.objectId (Institute reference)
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Institute',
    //     required: true
    // },
    // manager: {
    //     // type: String,   // type: mongoose.SchemaType.objectId (User reference)
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    manager: {
        // type: String,   // type: mongoose.SchemaType.objectId (User reference)
        type: String,
        required: true
    },
    // image_url: {
    //     type: String,
    //     required: true
    // },
    menu: {
        type: [MenuItem.schema],
        // required: true
        default: []
    },
    // opening_hours: {
    //     type: String,
    //     required: true
    // },
    contact: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        default: []
    },
});

const Canteen = mongoose.model('Canteen', canteenSchema);
module.exports = Canteen;
