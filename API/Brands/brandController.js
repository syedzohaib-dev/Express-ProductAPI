const Brand = require('./BrandModel');
const { connect } = require('mongoose');
require('dotenv').config();

const createBrand = async (req, res) => {
  const { BrandName, BrandImage } = req.body;
  console.log('Creating brand:', BrandName, BrandImage);

  if (!BrandName || !BrandImage) {
    return res.status(400).json({
      message: "Missing Required Field",
    });
  }

  try {
    await connect(process.env.MONGO_URI);
    console.log("DB Connected");
    const checkExisting = await Brand.exists({ BrandName });

    if (checkExisting) {
      return res.status(400).json({
        message: "Brand Already Exists",
      });
    }

    await Brand.create({ BrandName, BrandImage });
    const allBrands = await Brand.find();

    res.status(201).json({
      message: "Brand Created Successfully",
      brands: allBrands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllBrands = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const brands = await Brand.find()
        res.json({
             brands
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getBrandByID = async (req, res) => {

    const { _id } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const  brand = await Brand.findOne({ _id })
        res.json({  brand })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const updateBrand = async (req, res) => {

    const { _id,  BrandName,  BrandImage } = req.body

    const filter = { _id };
    const update = {  BrandName,  BrandImage };

    try {
        await connect(process.env.MONGO_URI)
        await Brand.findOneAndUpdate(filter, update, {
            new: true
        });
        const  brand = await  Brand.find()
        res.json({
            message: "Success",
             brand
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteBrand = async (req, res) => {

    const { _id } = req.body
    try {
        await connect(process.env.MONGO_URI)
        await Brand.deleteOne({ _id })
        const brand = await Brand.find()
        res.status(200).json({
            message: "Deleted Successfully",
            brand
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {createBrand , getAllBrands , getBrandByID , updateBrand , deleteBrand }