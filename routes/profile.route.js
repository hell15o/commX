const express = require("express");
const {profileInfo} = require("../controllers/profile.controller.js");
const router = express.Router();
const authUser = require("../middlewares/authUser")

router.get("/profile",authUser,profileInfo);

module.exports = router;