const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuitarSchema = new Schema({
    guitar_name: { type: String, required: true, maxLength: 100 },
    guitar_type: [{ type: Schema.Types.ObjectId, ref:"Type"}],
    description: { type: String, required: true },
    brand: {type: Schema.Types.ObjectId, ref: "Brand", required: true },
    price: {type: Number, required: true},
    photo: {type: Buffer},
  });

// Virtual for guitar's URL
GuitarSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/inventory/guitar/${this._id}`;
});

// Export model
module.exports = mongoose.model("Guitar", GuitarSchema);