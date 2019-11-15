const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new Schema({
    cookieId: { type: String, required: true },
    createdAt: { type: Date, expires: 300, default: Date.now }
  });

// sessionSchema.index({ createdAt: 1}, {expireAfterSeconds: 10});

module.exports = mongoose.model('Session', sessionSchema);