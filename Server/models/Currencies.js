const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for ServerPort
const Currencies = new Schema({
    charCode: { type: String },
    name: { type: String },
},{
    collection: 'currencies'
});

module.exports = mongoose.model('Currencies', Currencies);