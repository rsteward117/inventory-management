const Guitar = require("../models/guitar")
const Brand = require("../models/brand")
const Type = require("../models/type")
const GuitarInstance = require("../models/guitarinstance")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

    // //displays all guitar types for the home page
    // exports.index = asyncHandler(async (req, res, next) => {
      
    // });

  
  // Display list of all guitars.
  exports.guitar_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitar list");
  });
  
  // Display detail page for a specific guitar.
  exports.guitar_detail = asyncHandler(async (req, res, next) => {
    //get the details of the guitar, and its instances.
    const [guitar, guitarInstance] = await Promise.all([
      Guitar.findById(req.params.id).populate("brand").populate("guitar_type").exec(),
      GuitarInstance.find({guitar: req.params.id}).exec(),
    ]);

    if(guitar === null){
      //no results.
      const err = new Error(" guitar not found");
      err.status = 404;
      return next(err);
    }
    res.render("guitar_detail", {
      title: guitar.guitar_name,
      guitar: guitar,
      guitar_instance: guitarInstance,
    });
  });
  
  // Display guitar create form on GET.
  exports.guitar_create_get = asyncHandler(async (req, res, next) => {
    //get all the guitar types and brands
    const [allGuitarBrands, allGuitarTypes] = await Promise.all([
      Brand.find().sort({ brand_name: 1}).exec(),
      Type.find().sort({ name: 1}).exec(),
    ]);

    res.render("guitar_form",{
      title: "create Guitar",
      brands: allGuitarBrands,
      types: allGuitarTypes,
    })
  });
  
  // Handle guitar create on POST.
  exports.guitar_create_post = [
    //convert type to a array
    (req, res, next) => {
      if (!Array.isArray(req.body.guitar_type)) {
        req.body.guitar_type = typeof req.body.guitar_type === "underfined" ? [] : [req,body.guitar_type];
      }
      next();
    },

    body("guitar_name", "guitar name must not be empty.")
      .trim()
      .isLength({ min: 1})
      .escape(),
    body("guitar_type.*").escape(),
    body("description", "description must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("brand", "brand must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("price")
      .trim()
      .isLength({ min: 1})
      .escape()
      .withMessage("price must not be empty.")
      .isNumeric().withMessage("price must be a number"),

    //process requet after validation and sanitization.
    asyncHandler(async (req, res, next) => { 
      //extract the validation errors from a request.
      const errors = validationResult(req);

      //create a guitar object with the validated data.
      const guitar = new Guitar({
        guitar_name: req.body.guitar_name,
        guitar_type: req.body.guitar_type,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
      });

      if(!errors.isEmpty()) {
        //if there are errors, then render the form a again.
        const [allGuitarBrands, allGuitarTypes] = await Promise.all([
          Brand.find().sort({ brand_name: 1}).exec(),
          Type.find().sort({ name: 1}).exec(),
        ]);

        //marks selected types as checked.
        for (const type of allGuitarTypes) {
          if (guitar.guitar_type.includes(type._id)){
            type.checked = "true";
          }
        }
        res.render("guitar_form",{
          title: "create Guitar",
          brands: allGuitarBrands,
          types: allGuitarTypes,
          guitar: guitar,
          errors: errors.array(),
        });
      } else {
        await guitar.save();
        res.redirect(guitar.url);
      }
    }),
  ];
  
  // Display guitar delete form on GET.
  exports.guitar_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitar delete GET");
  });
  
  // Handle guitar delete on POST.
  exports.guitar_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitar delete POST");
  });
  
  // Display guitar update form on GET.
  exports.guitar_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitar update GET");
  });
  
  // Handle guitar update on POST.
  exports.guitar_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: guitar update POST");
  });