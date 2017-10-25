const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    local: {
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        rule: String
    }
}, { collections: 'users' })

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)