const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const GuitarInstanceSchema = new Schema({
    guitar: { type: Schema.Types.ObjectId, ref: "Guitar", required: true }, // reference to the associated guitar
    status: {
      type: String,
      required: true,
      enum: ["Available", "Out of Stock"],
      default: "Available",
    },
    quantity: {type: Number, required: true},
  });

  // Virtual for guitarinstance's URL
GuitarInstanceSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/inventory/guitarinstance/${this._id}`;
  });
  
  // Export model
  module.exports = mongoose.model("GuitarInstance", GuitarInstanceSchema);