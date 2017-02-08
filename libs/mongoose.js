const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.get('mongoose:uri'));
const db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});
db.once('open', function callback () {
    console.info("Connected to DB!");
});

const Schema = mongoose.Schema;

// Schemas
const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.virtual('userId')
    .get(function () {
        return this.id;
    });

const UserModel = mongoose.model('User', User);

const Marker = new Schema({
    username: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const MarkerModel = mongoose.model('Marker', Marker);

module.exports.UserModel = UserModel;
module.exports.MarkerModel = MarkerModel;