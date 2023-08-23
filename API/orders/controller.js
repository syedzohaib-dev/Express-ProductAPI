const nodemailer = require("nodemailer");
var Mailgen = require('mailgen');
const Orders = require('./schema');
const { connect } = require("mongoose");

const placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerId, customerContact, customerAddress, order } = req.body

    const config = {
        service: 'gmail',
        auth: {
            user: 'zohaib@gmail.com',
            pass: '12345678'
        }
    }

    const transporter = nodemailer.createTransport(config);


    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    });


    try {
        await connect(process.env.MONGO_URI)
        const orders = await Orders.create({ customerName, customerEmail, customerId, customerContact, customerAddress, order })

        await transporter.sendMail({
            from: "shumaimaf@gmail.com",
            to: customerEmail,
            subject: "Place Order",
            html: mailGenerator.generate({
                body: {
                    name: customerName,
                    intro: 'Welcome to Banoqabil! We\'re very excited to have you on board.',
                    table: {
                        data: [
                            {
                                customerName,
                                customerEmail,
                                customerAddress,
                                customerContact,
                                tracking_id: orders._id
                            }
                        ]
                    },
                    outro: `Your Order will be delived at ${customerAddress}, please ensure to active your contact number ${customerContact}`
                }
            })
        })

        res.json({
            message: "Order Placed Successfully , Please Check your MailBox"
        })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }







}

const allOrders = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        const orders = await Orders.find()
        res.json({ orders })

    }

    catch (error) {
        res.json(500).json({ message: error.message })
    }

}

const trackOrder = async (req, res) => {
    const { _id } = req.params

    try {
        await connect(process.env.MONGO_URI)
        const order = await Orders.findOne({ _id })
        res.json({order})
    }

    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { placeOrder, allOrders,trackOrder }
