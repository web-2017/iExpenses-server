import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const expensesSchema = new mongoose.Schema(
    {
        enum: {
            type: [String],
            default: ['clothes', 'home', 'restaurant', 'grocery', 'auto', 'grocery', 'auto', 'sport', 'work'],
        },
        entity: {
            title: String,
            amount: {
                type: Number,
                require: true,
            },
        },
        subscriptions: {
            title: String,
            amount: Number,
        },
        total: {
            title: String,
            amount: {
                type: Number,
                require: true,
            },
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        // clothes: Number,
        // home: Number,
        // restaurant: Number,
        // grocery: Number,
        // auto: Number,
        // sport: Number,
        // work: Number,
        createdBy: { type: ObjectId, ref: 'User' },
        role: {
            type: String,
            default: 'User',
        },
    },
    { timestamps: true },
)

const User = mongoose.model('Expenses', expensesSchema)
export default User
