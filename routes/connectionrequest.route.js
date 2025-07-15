const express = require("express");
const {connectionRequest} = require("../controllers/connectionRequest.controller");
const userAuth = require("../middlewares/authUser");
const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, connectionRequest);

module.exports = router;