const mongoose = require('mongoose');
const Canteen = require('./canteen');

const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    canteens: {
        type: [Canteen.schema],
        required: true
    }
});
console.log("Institute Schema: ", instituteSchema);
const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;
