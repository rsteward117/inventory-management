#! /usr/bin/env node
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Guitar = require("./models/guitar");
  const Brand = require("./models/brand");
  const Type = require("./models/type");
  const GuitarInstance = require("./models/guitarinstance");
  
  const types = [];
  const brands = [];
  const guitars = [];
  const guitarinstances = [];
  

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  

  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createTypes();
    await createBrands();
    await createGuitars();
    await createGuitarInstances();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function typeCreate(index, name) {
    const type = new Type({ name: name });
    await type.save();
    types[index] = type;
    console.log(`Added type: ${name}`);
  }
  
  async function brandCreate(index, brand_name) {
    const branddetail = { brand_name: brand_name};

  
    const brand = new Brand(branddetail);
  
    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${brand_name}`);
  }
  
  async function guitarCreate(index, guitar_name, guitar_type, description, brand, price, photo){
    const guitardetail = {
        guitar_name: guitar_name,
        description: description,
        brand: brand,
        price: price,
        photo: photo,
    };
    if (guitar_type != false) guitardetail.guitar_type = guitar_type;
  
    const guitar = new Guitar(guitardetail);
    await guitar.save();
    guitars[index] = guitar;
    console.log(`Added guitar: ${guitar}`);
  }
  
  async function guitarInstanceCreate(index, guitar, status, quantity) {
    const guitarinstancedetail = {
        guitar: guitar,
        quantity: quantity,
    };

    if (status != false) guitarinstancedetail.status = status;
  
    const guitarinstance = new GuitarInstance(guitarinstancedetail);
    await guitarinstance.save();
    guitarinstances[index] = guitarinstance;
    console.log(`Added guitarinstances: ${quantity}`);
  }
  
  async function createTypes() {
    console.log("Adding guitar types");
    await Promise.all([
      typeCreate(0, "Acoustic"),
      typeCreate(1, "Electric"),
      typeCreate(2, "Bass"),
    ]);
  }
  
  async function createBrands() {
    console.log("Adding guitar brands");
    await Promise.all([
      brandCreate(0, "Taylor"),
      brandCreate(1, "Ibanez"),
      brandCreate(2, "Fender"),
    ]);
  }
  
  async function createGuitars() {
    console.log("Adding Guitar");
    await Promise.all([
      guitarCreate(0,
        "Taylor 114ce Grand Auditorium Acoustic-Electric Guitar Natural",
        [types[0]],
        "A brand new taylor acoustic guitar",
        brands[0],
        "900"
      ),
      guitarCreate(1,
        "Ibanez GRGR131EX GRG Series 6-String Electric Guitar Flat Black",
        [types[1]],
        "A brand new Ibanez electric guitar",
        brands[1],
        "250"
      ),
      guitarCreate(2,
        "Squier Affinity Series Precision Bass PJ Maple Fingerboard Black",
        [types[2]],
        "A brand new fender bass guitar",
        brands[2],
        "280"
      ),
    ]);
  }
  
  async function createGuitarInstances() {
    console.log("Adding guitar instances");
    await Promise.all([
        guitarInstanceCreate(0, guitars[0], false, "Available", "12"),
        guitarInstanceCreate(1, guitars[1], false,"Available", "35"),
        guitarInstanceCreate(2, guitars[2], false, "Out of Stock", "0"),
    ]);
  }