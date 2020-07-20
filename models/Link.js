const {Schema, model, Types} = require('mongoose');

// creating of new entity
const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, required: true, default: Date.now},
    clicks: {type: Number, default: 0},
    // ref: 'User' === must be the same as name in other line
    owner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Link', schema);
