const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: String,
    url: String,
    status: Number,
    responseTime: Number,
    ip: String,
    os: String,
    device: String,
    client: String,
    date: Date,
    headers: Object,
    body: Object
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;