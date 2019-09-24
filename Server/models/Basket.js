const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for ServerPort
const Basket = new Schema({
    product_id: { type: String },
    quantity: { type: Number },
    name: { type: String },
    price: { type: Number },
    result: { type: Number },
    currency: { type: String },
},{
    collection: 'basket'
});

module.exports = mongoose.model('Basket', Basket);