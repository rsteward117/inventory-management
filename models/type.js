const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 100},
});

// Virtual for type's URL
TypeSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/inventory/type/${this._id}`;
  });

//export model
module.exports = mongoose.model("Type", TypeSchema);