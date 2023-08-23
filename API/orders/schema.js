const { Schema, model } = require('mongoose')

const OrdersSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },

    customerEmail: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    customerContact: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    order: {
        type: Array,
        required: true,
    },
    order_at: {
        type: Date,
        default: Date.now
    }
})

const Orders = model('order', OrdersSchema)
module.exports = Orders