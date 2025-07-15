const express = require("express");
// const router = require("./auth.route");
const userAuth = require("../middlewares/authUser");

const router = express.Router();

const {getConnectionRequests} = require("../controllers/getConnectionRequests.controller")

router.route("/getConnectionRequests").get(userAuth, getConnectionRequests);

module.exports = router;