const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
