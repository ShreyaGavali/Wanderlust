const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/singup", userController.renderSingupFrom);

router.post("/singup", wrapAsync(userController.signup));

router.get("/login",userController.renderLoginFrom);

router.post(
    "/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: '/login', 
        failueFlash: true,
    }), 
    userController.login   
);

router.get("/logout", userController.logout);

module.exports = router;