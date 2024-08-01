const express = require("express");
const router = express.Router();

//get controller modules
const guitar_controller = require("../controllers/guitarController");
const brand_controller = require("../controllers/brandController");
const type_controller = require("../controllers/typeController");
const guitar_instance_controller = require("../controllers/guitarinstanceController");

// guitar routes

//get inventory home page. As well as be a get request for list of all types
router.get("/", type_controller.index);

//get request for creating guitar inventory.
router.get("/guitar/create", guitar_controller.guitar_create_get);

//post request for creating guitar.
router.post("/guitar/create", guitar_controller.guitar_create_post);

//get request to delete guitar.
router.get("/guitar/:id/delete", guitar_controller.guitar_delete_get);

//post request to delete guitar.
router.post("/guitar/:id/delete", guitar_controller.guitar_delete_post);

//get request to update guitar.
router.get("/guitar/:id/update", guitar_controller.guitar_update_get);

//post request to update guitar.
router.post("/guitar/:id/update", guitar_controller.guitar_update_post);

//get request for one guitar.
router.get("/guitar/:id", guitar_controller.guitar_detail);

//get request for list of all guitar items.
router.get("/guitar", guitar_controller.guitar_list);

//brand routes
//get request for creating a brand
router.get("/brand/create", brand_controller.brand_create_get);

//post request for creating a brand
router.get("/brand/create", brand_controller.brand_create_post);

//get request to delete brand
router.get("/brand/:id/delete", brand_controller.brand_delete_get);

//post request to delete brand
router.get("/brand/:id/delete", brand_controller.brand_delete_post);

//get request to update brand
router.get("/brand/:id/update", brand_controller.brand_update_get);

//post request to update brand
router.get("/brand/:id/update", brand_controller.brand_update_post);

//get request for one brand
router.get("/brand/:id", brand_controller.brand_detail);

//get request for list of all brands
router.get("/brand", brand_controller.brand_list);

//type routers
//get request for creating a type
router.get("/type/create", type_controller.type_create_get);

//post request for creating a type
router.post("type/create", type_controller.type_create_post);

//get request for delete
router.get("/type/:id/delete", type_controller.type_delete_get);

//post request for delete
router.post("/type/:id/delete", type_controller.type_delete_post);

//get request for update
router.get("/type/:id/update", type_controller.type_update_get);

//post request for update
router.post("type/:id/update", type_controller.type_update_post);

//get request for one type
router.get("/type/:id", type_controller.type_detail);

//guitarInstance routes

//get request to create guitarinstance
router.get("/guitarinstance/create", guitar_instance_controller.guitarinstance_create_get);

//post request to create guitarinstance
router.post("/guitarinstance/create", guitar_instance_controller.guitarinstance_create_get);

//get request to delete guitarinstance
router.get("/guitarinstance/:id/delete", guitar_instance_controller.guitarinstance_delete_get);

//post request to delete guitarinstance
router.post("/guitarinstance/:id/delete", guitar_instance_controller.guitarinstance_delete_post);

//get request to update guitarinstance
router.get("/guitarinstance/:id/update", guitar_instance_controller.guitarinstance_update_get);

//post request to update guitarinstance
router.post("/guitarinstance/:id/update", guitar_instance_controller.guitarinstance_update_post);

//get request to get one guitarinstance
router.get("/guitarinstance/:id", guitar_instance_controller.guitarinstance_detail);

//get request to list all guitarinstances
router.get("/guitarinstance", guitar_instance_controller.guitarinstance_list);

module.exports = router;





