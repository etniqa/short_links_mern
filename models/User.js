const {Schema, model, Types} = require('mongoose');

// creating of new entity
const schema = new Schema({
    email: {type: String, required: true, unique: true}, // email field is required and unique
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);
