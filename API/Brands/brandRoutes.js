const express = require('express')
const router = express.Router()
const {createBrand , getAllBrands , getBrandByID , updateBrand , deleteBrand } = require('./brandController')

router.post('/create-brand' , createBrand)
router.get('/get-all-brand' , getAllBrands)
router.get('/get-brand-by-id' , getBrandByID)
router.put('/update-brand' , updateBrand)
router.delete('/delete-brand' , deleteBrand)

module.exports = router;