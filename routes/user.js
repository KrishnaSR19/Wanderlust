const express = require("express");
const router = express.Router();
const User  = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");




//signup form and sign in
router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));
  

    
//login form and login
router 
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,  ///this middleware redirect you to the location where you wanted to go after the login
        passport.authenticate("local",{
            failureRedirect:"/login",
                failureFlash:true
            }), 
    
        userController.login,
    );



//logout user
router.get("/logout",userController.logout)


module.exports = router;
