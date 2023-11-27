const mongoose = require('mongoose');

const Schema = mongoose.Schema

const walletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currency: {
        type: String,
        enum: ['NGN', 'USD', 'GBP', 'EUR', 'KES'],
        default: 'NGN'
    },
    walletBalance: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Wallet', walletSchema)