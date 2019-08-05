const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username is Required'],
        unique : [true, 'Username is Already Taken']
    },
    email : {
        type : String,
        required : [true, 'Email is Required'],
        unique : [true, 'Email is Already Taken']
    },
    password : {
        type : String,
        required : [true, 'Password is Required']
    },
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User',UserSchema)