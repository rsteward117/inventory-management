const Type = require("../models/type");
const Guitar = require("../models/guitar");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Display list of all type, and home page.
exports.index = asyncHandler(async (req, res, next) => {
  const allGuitarTypes = await Type.find().exec();

  res.render("index", {
    title: "Guitar Types",
    guitar_type_list: allGuitarTypes,
  });
  });
  
  // Display detail page for a specific type.
  exports.type_detail = asyncHandler(async (req, res, next) => {
    //get the details of guitar types and associated guitars.
    const [type, guitarsInType] = await Promise.all([
      Type.findById(req.params.id).exec(),
      Guitar.find({guitar_type: req.params.id}, "guitar_name description").exec(),
    ]);
    
    if(type === null){
      //No results
      const err = new Error("Guitar Type not found");
      err.status = 404;
      return next(err);
    }

    res.render("type_detail", {
      title: "Guitar Type",
      type: type,
      type_guitar: guitarsInType,
    });
  });
  
  // Display type create form on GET.
  exports.type_create_get = asyncHandler(async (req, res, next) => {
    res.render("type_form", {
      title: "Create Type"
    });
  });
  
  // Handle type create on POST.
  exports.type_create_post = [
    // Validate and sanitize the name field.
    body("name", "type name must contain at least 3 characters")
      .trim()
      .isLength({ min: 3 })
      .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a type object with escaped and trimmed data.
      const type = new Type({ name: req.body.name });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("type_form", {
          title: "Create type",
          type: type,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if type with same name already exists.
        const typeExists = await Type.findOne({ name: req.body.name })
          .collation({ locale: "en", strength: 2 })
          .exec();
        if (typeExists) {
          // type exists, redirect to its detail page.
          res.redirect(typeExists.url);
        } else {
          await type.save();
          // New type saved. Redirect to type detail page.
          res.redirect(type.url);
        }
      }
    }),
  ];
  
  // Display type delete form on GET.
  exports.type_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: type delete GET");
  });
  
  // Handle type delete on POST.
  exports.type_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: type delete POST");
  });
  
  // Display type update form on GET.
  exports.type_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: type update GET");
  });
  
  // Handle type update on POST.
  exports.type_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: type update POST");
  });