const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    cookieId: { type: String, required: true},
    createdAt: {type: Date, Index: {expires: 10}, default: Date.now }
});


module.exports = mongoose.model('Session', sessionSchema);