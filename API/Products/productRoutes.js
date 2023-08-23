const express = require('express')
const router = express.Router()
const { createProduct, getProductByBrand, getAllProduct, getProductByName, getProductById, getProductByCategory, updateProduct, deleteProduct } = require('./productController')


router.post('/create-product' , createProduct)
router.get('/get-all-products' , getAllProduct)
router.get('/get-product-by-name' , getProductByName)
router.get('/get-product-by-id' , getProductById)
router.get('/get-product-by-brand' , getProductByBrand)
router.get('/get-product-by-category' , getProductByCategory)
router.put('/update-product' , updateProduct)
router.delete('/delete-product' , deleteProduct)


module.exports = router;