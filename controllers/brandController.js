const Brand = require("../models/brand");
const Guitar = require("../models/guitar");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


// Display list of all brands.
exports.brand_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand list");
  });
  
  // Display detail page for a specific brand.
  exports.brand_detail = asyncHandler(async (req, res, next) => {
    const [brand, guitarsInBrand] = await Promise.all([
      Brand.findById(req.params.id).exec(),
      Guitar.find({brand: req.params.id}, "guitar_name guitar_type description").exec(),
    ]);

    if(brand === null){
      const err = new Error("Guitar brand not found");
      err.status = 404;
      return next(err);
    }

    res.render("brand_detail", {
      title: "Guitar Brand",
      brand: brand,
      brand_guitar: guitarsInBrand,
    });
  });
  
  // Display brand create form on GET.
  exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.render("brand_form", { title: "Create brand" });
  });
  
  // Handle brand create on POST.
  exports.brand_create_post = [
    // Validate and sanitize fields.
    body("brand_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("brand name must be specified.")
      .isAlphanumeric()
      .withMessage("brand name has non-alphanumeric characters."),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create brand object with escaped and trimmed data
      const brand = new Brand({
        brand_name: req.body.brand_name,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("brand_form", {
          title: "Create brand",
          brand: brand,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
  
        // Save brand.
        await brand.save();
        // Redirect to new brand record.
        res.redirect(brand.url);
      }
    }),
  ];
  
  // Display brand delete form on GET.
  exports.brand_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand delete GET");
  });
  
  // Handle brand delete on POST.
  exports.brand_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand delete POST");
  });
  
  // Display brand update form on GET.
  exports.brand_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand update GET");
  });
  
  // Handle brand update on POST.
  exports.brand_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: brand update POST");
  });