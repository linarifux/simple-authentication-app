const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true})

// hashign password
userSchema.pre('save', async function(next){
const user = this
if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
    next()
}
})

// compare password
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const User = new mongoose.model('user', userSchema)

module.exports = User