const mongoose = require('mongoose');
const { string } = require('zod');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 10
    }
})

const User = mongoose.model('users', userSchema);

const SellerTableSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refrences: User
    },
    place: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    area: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 100
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathroom: {
        type: Number,
        required: true,
    },
    nearby_places: {
        type: String,
        lowercase: true
    }  
})



const Seller = mongoose.model('sellers', SellerTableSchema)

module.exports = {
    Seller,
    User
}