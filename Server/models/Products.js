const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Products
const Products = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    img: { type: String }
},{
    collection: 'products'
});

module.exports = mongoose.model('Products', Products);