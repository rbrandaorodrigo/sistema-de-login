const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, require: true, minlength:3, maxlength:50},
    email: {type: String, require: true, minlength:5, maxlength:80},
    password: {type: String, require: true, minlength:8},
})

module.exports = mongoose.model('User', userSchema)