const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {type: String, required: true, unique: true},
    originalURL: {type: String, required: true},
    createdAt: {type: Date, default: Date.now },
    clicks: {type: Number, default: 0}
});

module.exports = mongoose.model('Url', urlSchema);