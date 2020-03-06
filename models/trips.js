const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trip = new Schema({
    username: {
        type: String,
        required: "Username is required"
    },
    totalCost: {
        type: Number,
        required: "Cost of trip is required"
    },
    whereTo: {
        type: String,
        required: "Destination is required"
    },
    whereFrom: {
        type: String,
        required: "Origin is required"
    },
    travelDate: {
        type: Date,
        required: "Date is required"
    },
    quantity: {
        type: Number,
        required: "Quantity is required"
    }
});

module.exports = mongoose.model('Trip', Trip);