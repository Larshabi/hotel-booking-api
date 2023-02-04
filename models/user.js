const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
})

const User = model('User', userSchema);
module.exports = User;