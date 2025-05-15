const express = require("express");
const { registerUser, loginUser ,getUserProfile,getUserByUserName} = require("../controllers/authController");
const authenticate = require("../authenticate");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", getUserProfile);
router.get("/:username",authenticate, getUserByUserName);

module.exports=router