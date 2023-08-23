const Category = require('./Model')
const { connect } = require('mongoose')
require('dotenv').config()

const getAllCategories = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)

        const categories = await Category.find()

        res.json({
            // category: allCategories
            categories
        })



    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getCategorybyID = async (req, res) => {
    const { _id } = req.query
    // const { CategoryName, CategoryImage } = req.body

    // if (!CategoryName || !CategoryImage) {
    //     res.status(403).json({
    //         message: "Missing Required Field"
    //     })
    // }
    // else {
    //     try {
    //         await connect(process.env.MONGO_URI)
    //         res.json({
    //             message: "DB Connected"
    //         })
    //     }
    //     catch (error) {
    //         res.status(400).json({
    //             message: error.message
    //         })
    //     }
    // }

    try {
        await connect(process.env.MONGO_URI)

        const category = await Category.findOne({ _id })

        res.json({ category })



    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Required Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(400).json({
                    message: "Category Already Exists"
                })
            }

            else {
                await Category.create({ CategoryName, CategoryImage })
                const Categories = await Category.find()

                res.json({
                    message: "DB Connected",
                    Categories
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
    const { _id, CategoryName, CategoryImage } = req.body
    const filter = { _id };
    const update = { CategoryName, CategoryImage };
    try {
        await connect(process.env.MONGO_URI)
        await Category.findOneAndUpdate(filter, update, {
            new: true
        })

        const category = await Category.find()


        res.json({
            message: "Success",
            category
        })

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    const { CategoryName } = req.body

    try {
        await connect(process.env.MONGO_URI)

        await Category.deleteOne({ CategoryName: CategoryName })
        const categories = await Category.find()


        res.status(200).json({
            message: "Deleted Successfully",
            categories
        })



    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
// const { CategoryName } = req.body;

// if (!CategoryName) {
//     res.status(400).json({
//         message: "Please give CategoryName"
//     })  
// }

// else {
//     try {
//         await connect(process.env.MONGO_URI)
//         await Category.deleteOne({ CategoryName: CategoryName })
//         const categories = await Category.find()

//         res.json({
//             message: "Category Deleted Successfully",
//             categories
//         })

//     }

//     catch (error) {
//         res.json({
//             message: error.message
//         })
//     }
// }
// }

module.exports = { getAllCategories, getCategorybyID, createCategory, updateCategory, deleteCategory }