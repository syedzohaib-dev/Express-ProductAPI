const Category = require('./Model')
const { connect } = require('mongoose')
require('dotenv').config()

const getAllCategories = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)

        const allCategories = await Category.find()

        res.json({
            category: allCategories
        })



    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getCategorybyID = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            res.json({
                message: "DB Connected"
            })
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body
    if (!CategoryName || !CategoryImage) {

    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(400).json({
                    message: "Category Already Exists"
                })
            }
            else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()

                res.json({
                    message: "DB Connected",
                    category: allCategories
                })
            }


        }
        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

const updateCategory = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = { getAllCategories, getCategorybyID, createCategory, updateCategory, deleteCategory }