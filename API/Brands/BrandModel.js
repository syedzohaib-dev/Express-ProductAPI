const { Schema, model } = require('mongoose')

const brandSchema = new Schema({
  BrandName: {
    type: String,
    required: true,
    unique: true,
  },
  BrandImage: {
    type: String,
    required: true
  }
});

const Brand = model("Brand", brandSchema);
module.exports = Brand;