const app = require('express')
const router = app.Router()
const { getAllCategories, getCategorybyID, createCategory, updateCategory, deleteCategory } = require('./categoryController')


router.get('/get-all-categories', getAllCategories)
router.get('/get-category-by-id', getCategorybyID)
router.post('/create-category', createCategory)
router.put('/update-category', updateCategory)
router.get('/delete-category', deleteCategory)


module.exports = router

