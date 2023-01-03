const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: String,
        description: String,
        amount: Number,
        newBalance: Number || null,
        type: String,
        category: String,
        notes: String,
        card: String,
    },
    {
        timestamps: true,
        toObject: {
            transform: (doc, ret, options) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
                return ret;
            }
        }
    }
);


module.exports = mongoose.model('Transaction', transactionSchema)
