const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('StoredSession', schema)