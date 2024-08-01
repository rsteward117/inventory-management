const guitarinstance = require("../models/guitarinstance");

const asyncHandler = require("express-async-handler");

// Display list of all guitarinstances.
exports.guitarinstance_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance list");
  });
  
  // Display detail page for a specific guitarinstance.
  exports.guitarinstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: guitarinstance detail: ${req.params.id}`);
  });
  
  // Display guitarinstance create form on GET.
  exports.guitarinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance create GET");
  });
  
  // Handle guitarinstance create on POST.
  exports.guitarinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance create POST");
  });
  
  // Display guitarinstance delete form on GET.
  exports.guitarinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance delete GET");
  });
  
  // Handle guitarinstance delete on POST.
  exports.guitarinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance delete POST");
  });
  
  // Display guitarinstance update form on GET.
  exports.guitarinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance update GET");
  });
  
  // Handle guitarinstance update on POST.
  exports.guitarinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitarinstance update POST");
  });