const Product = require('./ProductModel')
const {connect} = require('mongoose')
require('dotenv').config()


const createProduct = async (req, res) => {

    const { ProductName, description, price, category, brand, thumbnail, imageArray } = req.body

    if (!ProductName || !description || !price || !category || !brand || !thumbnail || !imageArray) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExistingProduct  = await Product.exists({ ProductName  })

            if (checkExistingProduct ) {
                res.status(400).json({
                    message: "Product  Already Exists"
                })
            }
            else {
                await Product.create({ ProductName, description, price, category, brand, thumbnail, imageArray})
                const Products  = await Product.find()

                res.json({
                    message: "Product created",
                     Products 
                })
            }}
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }}
}

const getProductByBrand = async (req, res) => {

    const { brand } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const products = await Product.findOne({ brand })
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getProductByName = async (req, res) => {

    const { ProductName } = req.query;
    try {
        await connect(process.env.MONGO_URI);
        const products = await Product.findOne({ ProductName });
        
        res.json({ products });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getProductById = async (req, res) => {

    const { _id } = req.params
    try {
        await connect(process.env.MONGO_URI)
        const products = await Product.findOne({ _id })
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllProduct = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const products = await Product.find()
        res.json({
            products
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getProductByCategory = async (req, res) => {

    const { category } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const products = await Product.findOne({ category })
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {

    const { _id, ProductName, description, price, category, brand, thumbnail, imageArray } = req.body

    const filter = { _id };
    const update = { ProductName, description, price, category, brand, thumbnail, imageArray };

    try {
        await connect(process.env.MONGO_URI)
        await Product.findOneAndUpdate(filter, update, {
            new: true
        });
        const products = await Product.find()
        res.json({
            message: "Success",
            products
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {

    const { _id } = req.body
    try {
        await connect(process.env.MONGO_URI)
        await Product.deleteOne({ _id })
        const products = await Product.find()
        res.status(200).json({
            message: "Deleted Successfully",
            products
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = { createProduct, getProductByBrand, getAllProduct, getProductByName, getProductById, getProductByCategory, updateProduct, deleteProduct }