const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  brand_name: { type: String, required: true, maxLength: 100 },
});

// Virtual for brand's URL
BrandSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory/brand/${this._id}`;
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);