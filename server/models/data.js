// data.js
const mongoose = require('mongoose');

// Define the warehouse schema
const warehouseSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true,
        min: 100000,
        max: 999999,
    },
    productName: {
        type: String,
        enum: ['medicine', 'cutlery', 'clothes', 'shoes', 'etc'],
        required: true,
    },
    toPincode: {
        type: String,
        required: true,
    },
    fromPincode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['scanned', 'unscanned'],
        default: 'unscanned',
    },
}, { collection: 'data' }); // Specify the collection name explicitly

// Create the warehouse model
const Data = mongoose.model('data', warehouseSchema);

module.exports = Data;
