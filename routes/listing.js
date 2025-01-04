const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

const listingController =require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage});



//New Route
router.get("/new",isLoggedIn,
    listingController.renderNewForm);

//Index Route
//Create Route

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
       isLoggedIn,
      
       upload.single('listing[image]'),
       validateListing,
       wrapAsync(listingController.createListing)
    );

//show route
//Update Route
//delete Route    
router
    .route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListings)
    );

   





//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports=router;



// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangut,Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing..");
// });s