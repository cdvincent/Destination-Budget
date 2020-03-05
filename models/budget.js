const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new Schema({
    username: {
        type: String,
        required: "Username is required"
    },
    income: {
        type: Number,
        required: "Income total is required"
    },
    rent: {
        type: Number,
        required: "Rent total is required"
    },
    utilities: {
        type: Number,
        required: "Utilities total is required"
    },
    internet : {
        type: Number,
        required: "Internet total is required"
    },
    carExpenses: {
        type: Number,
        required: "Car expenses total is required"
    },
    groceries: {
        type: Number,
        required: "Groceries total is required"
    },
    cell: {
        type: Number,
        required: "Cell total is required"
    },
    creditCards: {
        type: Number,
        required: "Credit card payment total is required"
    },
    otherExpenses: {
        type: Number,
        required: "Other expenses is required"
    },
    totalBudget: {
        type: Number,
        required: "Total budget total is required"
    }
});

module.exports = mongoose.model('Budget', Budget);